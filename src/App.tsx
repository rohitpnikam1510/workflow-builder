import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import { RootState } from './redux/store';
import BottomPanel from './components/BottomPanel';
import { setOutputData } from './redux/outputSlice';

const App: React.FC = () => {

  const dispatch = useDispatch();

  const outputData = useSelector((state: RootState) => state.outputData);

  console.log("Output Data:");
  console.log(outputData);



  // Sample data to simulate fetching from API or other parts of the app
  const sampleData: Record<string, unknown>[] = [
    {
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
      },
    },
    {
      name: 'Jane',
      age: 25,
      address: {
        street: '456 Elm St',
        city: 'San Francisco',
      },
    },
  ];

  useEffect(() => {
    // Dispatch the data to Redux store when the component mounts
    dispatch(setOutputData(sampleData));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="flex flex-grow pt-16">
        <LeftPanel />
      </div>
      <BottomPanel data={outputData.data} />
    </div>
  );
};

export default App;
