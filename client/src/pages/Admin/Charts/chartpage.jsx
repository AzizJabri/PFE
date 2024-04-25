import '/src/App.css';


import ProductChart from '@/components/ProductChart';
import CardBarChart from '@/components/chartbar';
import ChartNumbers from '@/components/chartnumbers'
import BestUser from '@/components/BestUser';
function chartpage() {
  return (
    <>
    <div className="chart-container">
        <div className='product'>
      <ProductChart />
      </div>
      <CardBarChart />
    </div>
    <ChartNumbers/>
    <BestUser/>
    <br></br>
    </>
  );
}

export default chartpage;
