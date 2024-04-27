import ProductChart from '@/components/ProductChart';
import CardBarChart from '@/components/chartbar';
import ChartNumbers from '@/components/chartnumbers';
import BestUser from '@/components/BestUser';

function chartpage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Product Chart</h2>
          <ProductChart />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Card Bar Chart</h2>
          <CardBarChart />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Chart Numbers</h2>
          <ChartNumbers />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Best User</h2>
          <BestUser />
        </div>
      </div>
    </div>
  );
}

export default chartpage;
