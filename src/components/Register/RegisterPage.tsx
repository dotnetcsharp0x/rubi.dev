
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { IRegister } from '../../types/Interfaces/Register/IRegister';
import { RegisterU } from '../../types/Classes/Register/Register';
import axios, { AxiosRequestConfig } from 'axios';
import { JWT } from '../../types/Interfaces/Login/JWT';



export default function RegisterPage() {
  const cookies = new Cookies();
  
  const reg = new RegisterU();

  const [name,setName] = useState("")
  const [name2,setName2] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [jwt,setJwt] = useState<string>("")

  const onButtonClick =() => {
    reg.FirstName = name;
    reg.LastName = name2;
    reg.Email = email;
    reg.Password = password;
    Register();
  }
  const Register = () => {
    axios
    .post<IRegister>('https://localhost:7168/api/User/Register',reg)
    .then((resp)=> {
      const reps_data = resp.data;
      console.log(reps_data);
    })
  }

async function RegisterUser() {
  try {
    Register();
  }
  catch (e) {
    alert(e)
  }
}

// async function loginUser(iuser:ILogin) {
//   try {
//     fetchToken();
//     console.log(jwt);
//     cookies.set("jwt",jwt)
//   }
//   catch (e) {
//     alert(e)
//   }
// }

  return (
    <form className="flex max-w-md flex-col gap-4" 
    >
      <div>
        <h1>{name}</h1>
        <div className="mb-2 block">
          <Label
            htmlFor="Name"
            value="Your name" 
          />
        </div>
        <TextInput
          id="Name"
          placeholder="name@flowbite.com"
          required
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="Name2"
            value="Your Last name"
          />
        </div>
        <TextInput
          id="Name2"
          required
          type="text"
          value={name2}
          onChange={(e)=>setName2(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="Email"
            value="Your Email"
          />
        </div>
        <TextInput
          id="Email"
          required
          type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="Password"
            value="Your password"
          />
        </div>
        <TextInput
          id="Password"
          required
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <Button type="button" onClick={onButtonClick}>
        Submit
      </Button>
    </form>
  )
}

