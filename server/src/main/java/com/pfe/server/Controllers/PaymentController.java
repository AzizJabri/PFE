package com.pfe.server.Controllers;

import com.pfe.server.Models.*;
import com.pfe.server.Payloads.Responses.MessageResponse;
import com.pfe.server.Services.*;
import com.pfe.server.Utils.CustomerUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/payment")
@CrossOrigin
public class PaymentController {
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private OrdersService ordersService;

    @Value("${STRIPE_SECRET}")
    private String stripeSecret;

    @Value("${FRONTEND_URL}")
    private String frontendURL;

    @PostMapping("/checkout")
    ResponseEntity<MessageResponse> checkout(Principal principal) throws StripeException {


        User user = userService.getUserByEmail(principal.getName());

        List<Address> addresses = addressService.getAllAddresses(user.getEmail());

        if (addresses.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No address found"));
        }

        Stripe.apiKey = stripeSecret;
        String clientBaseURL = frontendURL;

        // Start by finding an existing customer record from Stripe or creating a new one if needed
        Customer customer = CustomerUtil.findOrCreateCustomer(user.getEmail(), user.getProfile().getFirstName());

        // Next, create a checkout session by adding the details of the checkout
        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setCustomer(customer.getId())
                        .setSuccessUrl(clientBaseURL + "#/payment/success?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl(clientBaseURL + "#/payment/failure");

        Orders order = cartService.createOrderFromCart(user);
        if (order == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Cart is empty"));
        }

        for (OrderItems orderItem : order.getOrderItems()) {
            PriceData priceData =
                    PriceData.builder()
                            .setCurrency("usd")
                            .setProductData(
                                    PriceData.ProductData.builder()
                                            .setName(orderItem.getProduct().getName())
                                            .addImage(String.valueOf(orderItem.getProduct().getImages().getFirst()))
                                            .build())
                            .setUnitAmount(Math.round(orderItem.getPrice() * 100))
                            .build();

            paramsBuilder.addLineItem(
                    SessionCreateParams.LineItem.builder().setPriceData(priceData).setQuantity((long) orderItem.getQuantity()).build());
        }
        ordersService.createOrder(order);
        Session session = Session.create(paramsBuilder.build());

        return ResponseEntity.ok(new MessageResponse(session.getUrl()));
    }

    @GetMapping("/success")
    public ResponseEntity<MessageResponse> success(@RequestParam String session_id, Principal principal) throws StripeException {
        try{
            Session session = Session.retrieve(session_id);
            if (session.getPaymentStatus().equals("paid")) {
                User user = userService.getUserByEmail(principal.getName());
                Cart cart = cartService.getCartByUserId(user.getId());
                cart.getCartItems().clear();
                cartService.saveCart(cart);
                return ResponseEntity.ok(new MessageResponse("Payment successful"));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Payment failed"));
            }
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid session ID"));
        }
    }


}


