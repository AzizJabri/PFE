import ProductChart from '@/components/ProductChart';
import CardBarChart from '@/components/chartbar';
import ChartNumbers from '@/components/chartnumbers';
import BestUser from '@/components/BestUser';

function chartpage() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-base-200 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Product Chart</h2>
          <ChartNumbers />
        </div>

        <div className="bg-base-200 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Card Bar Chart</h2>
          <BestUser />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-base-200 rounded-lg shadow-md p-4">
          <ProductChart />
        </div>

        <div className="bg-base-200 rounded-lg shadow-md p-4">
          <CardBarChart />
        </div>
      </div>
    </div>
  );
}

export default chartpage;
