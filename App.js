// import logo from './logo.svg';
import './App.css';
import * as Yup from "yup";
import { Formik, Form, Field , ErrorMessage } from 'formik';


function App() {

  const validationSchema = Yup.object({
    addresses: Yup.array().of(
      Yup.object({
        title: Yup.string().min(3,"Too Short").required("Please Enter this feild"),
        streetNo : Yup.string().required("This Feild is required"),
        sector : Yup.string().required("required"),
        city : Yup.string().required(" requried"),
        country: Yup.string().required(" requried"),
        pincode : Yup.string("it mus be a number").matches(/^[1-9][0-9]{5}/, "Invalid Pincode")
      })
    )
  })
  return (<div className=' bg-slate-300 h-[100vh]'>
    <div  className=' flex flex-col items-center mx-auto w-[80%] '>

<h1 className=' text-4xl font-extrabold text-cyan-600 w-full text-center font-sans'>Addresses</h1>

<Formik

  initialValues={{

    addresses: [
      {
        title: "",
        streetNo : "",
        sector : "",
        city : '',
        pincode : "",
        country : '',
        editIndex:null
      },
    ]
  }}

  validationSchema={validationSchema}

  onSubmit={values => {

    // same shape as initial values

    console.log(values);


  }}

>
  {
    ({values, isValid ,setFieldValue}) => (
      <Form className='flex flex-col mx-auto items-center w-full'>
        {values.addresses.map((address, index) =>(<div key={index} className=' w-full'>
          <div className=' font-bold text-3xl font-sans text-zinc-700'>{address.title}</div>

              {(index === address.editIndex || (values.addresses.length < 2) ) && ["title", "streetNo", "sector" ,"city", "pincode","country"].map((field , i) =>{
                return(<div className='flex flex-col my-2'>
                    <label name = {`addresses.[${index}].${field}`} className=' mx-3 font-semibold'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <Field name = {`addresses[${index}].${field}`} type={"text"} className=" border-2  border-blue-400 rounded-lg focus:border-red-400 focus:border-4 py-1 px-3" />
                    <ErrorMessage name = {`addresses[${index}].${field}`} component="div" style = {{'color':"red", 'font-size': "12px" }} />

                </div>)

              })}
              <button type='button' className=' border-blue-600 py-1 px-2 rounded-xl border-4 bg-blue-400 mx-2 text-white my-2  font-mono font-semibold'
                onClick={()=>{
                  setFieldValue(`addresses[${index}].editIndex`, (address.editIndex === null) ? (index):(null))
                }}
                >{!address.editIndex ? ("Edit") : ("save")}</button>
              <button type="button" onClick={ ()=>{
                if(values.addresses.length <= 2){
                  alert("Your connot remove this feild because this is the last field");
                }else{
                  const newAddressess = values.addresses.filter((val, i) => i !== index);
                  setFieldValue('addresses', newAddressess);
                }
              }}  className=' border-red-600 py-1 px-2 rounded-xl border-4 bg-red-500 text-white my-2 mx-2 font-mono font-semibold '>delete</button>
        </div>))}
        <button type="button" onClick={()=>{
          const currentAddress  = values.addresses[values.addresses.length-1];
          setFieldValue(`addresses[${values.addresses.length -1}].editIndex`, values.addresses.length-1)


          if(isValid){
            setFieldValue('addresses',[...values.addresses,{currentAddress}]);
          }
          else{
            alert("please fill all detail carefully")
          }
        }} className='border-blue-600 py-1 px-2 rounded-xl border-4 bg-blue-400 mx-2 text-white font-semibold  font-mono font-semibold'>
          Add Address
        </button>
      </Form>
    )
  }
</Formik>

</div>
</div>
    
  );
}

export default App;
