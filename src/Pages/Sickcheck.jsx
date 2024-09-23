import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import Symp from '../Components/Symp';
import Modal from "@mui/material/Modal";

const Sickcheck = () => {
    const [symptoms,setsymptoms] = useState([]);
    const [search,setsearch] = useState("");
    const [selected_symptoms,set_selected_symptoms] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [disease,setdisease] = useState("Select Symptoms to Predict Disease");
    
    // useEffect(()=>{console.log(selected_symptoms)},[selected_symptoms])

    useEffect(()=>{
        const fetchsymptoms = async ()=>{
            try{
                const response = await axios.get('http://127.0.0.1:5000/symptoms');
                setsymptoms(response.data.symptoms)
                const sysdict = response.data.symptoms.reduce((acc,symp)=>{
                    acc[symp] = 0;
                    return acc;
                },{});

                set_selected_symptoms(sysdict);
                // console.log(selected_symptoms)
            }
            catch(error)
            {
                console.error("Error making the get request in the symptoms ",error);
            }
        }

        fetchsymptoms();
        setShowModal(true);
    },[])

    const filteredSymptoms = symptoms.filter(symptom =>
        symptom.toLowerCase().includes(search.toLowerCase())
    );

    const handlePredict = async()=>
    {
        const response = await axios.post('http://127.0.0.1:5000/predict',{data:selected_symptoms});
        console.log("Changed")
        setdisease(response.data.prediction)
    }

    return (
      <div
        className="flex flex-col w-screen h-screen bg-violet-200 my-7 items-center p-5"
        style={{ fontFamily: "Poppins" }}
      >
        {showModal && <><div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
        
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    
                <div className="flex items-start justify-between p-5 border-b-4 border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Important Note!
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    The predictions provided by this machine learning model are intended solely to give an overview of your health condition. They should not be used as a substitute for professional medical advice.<span className="text-violet-600 font-semibold"> We strongly recommend consulting with a qualified healthcare provider for a comprehensive diagnosis and appropriate treatment options.</span> <br/><br/>Additionally, providing detailed information about your symptoms will help ensure a more accurate prediction of potential health issues.
                </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md hover:bg-red-200 rounded-xl"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> </>
        }

        <p className="text-3xl text-violet-800 font-semibold">
          <span>Symptom-Based Health Prediction</span>
        </p>

        <div className="flex gap-10 items-center justify-center w-full">
        <i class="fa-solid fa-magnifying-glass absolute top-43 mt-10 right-2/3 " ></i>
          <input
            type="text"
            className="mt-10 ml-20 pl-20 py-4 rounded-2xl"
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          ></input>
          <button
            className="p-3 mt-10 border-4 rounded-2xl px-10 bg-violet-500 hover:scale-105 text-white"
            onClick={() => handlePredict()}
          >
            Predict
          </button>

          <div className='p-2 text-lg mt-10 border-4 border-violet-500 rounded-2xl w-2/6 bg-white flex items-center justify-center'>
            {disease}
          </div>
        </div>
        <div className="flex flex-wrap w-fit py-8 h-fit overflow-auto">
          {filteredSymptoms.map((key) => (
            <Symp
              data={key}
              selected={selected_symptoms[key] == 1 ? true : false}
              update={set_selected_symptoms}
            />
          ))}
        </div>
      </div>
    );
}

export default Sickcheck
