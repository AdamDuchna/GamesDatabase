import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import { Formik,Field,Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');


function App() {
  return (
    <div className="App">
      <div>
              <Formik
                initialValues={{
                    id: uuidv4(),
                    producer: '',
                    model: '',
                    color: '',
                    keytype: '',
                    size: ''

                }}
                onSubmit={(values) => axios.post('api/keyboards',values).then(res=>console.log(res.data))}
                enableReinitialize={true}>
                    <Form>
                        <Field name="producer" placeholder="Producer" />
                        <Field name="model" placeholder="Model" />
                        <Field name="color" placeholder="Color" />
                        <Field name="keytype" placeholder="Keytype" />
                        <Field name="size" placeholder="Size" />
                        <button type="submit">
                            Submit
                        </button>
                    </Form>
                </Formik>
                <div onClick={()=>axios.get('api/keyboards').then(res=>console.log(res.data))}>GET KEYBOARDS</div>
        </div>
    </div>
  );
}

export default App;
