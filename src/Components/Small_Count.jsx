import SmallBarChart from "../Components/SmallBarChart";

const Small_Count = (props) => {
    return (
      <div className="bg-white rounded-xl h-48 flex flex-col px-2 my-2 hover:scale-105">
        <div className="px-3 pt-3 text-lg">
          <span>{props.name}:</span>
          <span className="pl-1 text-blue-800 font-bold">{props.data[props.data.length-1]}</span>
        </div>
          <SmallBarChart data={props.data} name={props.name} className="flex-grow h-0"/>
      </div>
    );
  };
  
  export default Small_Count;