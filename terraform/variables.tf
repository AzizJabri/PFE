variable "resource_group_name" {
  type        = string
  description = "RG name in Azure"
}
variable "location" {
  type        = string
  description = "Resources location in Azure"
}
variable "login"{
  type          = string
  description = "logins"
}
variable "loginpassword"{
  type          = string
  description = "loginpassword"
}