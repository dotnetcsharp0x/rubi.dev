
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { ILogin } from '../../types/Interfaces/Login/ILogin';
import { Login } from '../../types/Classes/Login/Login';
import axios, { AxiosRequestConfig } from 'axios';
import { JWT } from '../../types/Interfaces/Login/JWT';



export default function LoginPage() {
  const cookies = new Cookies();
  
  const logi = new Login();

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [jwt,setJwt] = useState<string>("")

  const onButtonClick =() => {
    logi.email = email;
    logi.password = password;
    loginUser(logi)
  }

  const fetchToken = () => {
    axios
    .post<string>('https://localhost:7168/api/User/Login',logi)
    .then((resp) => {
      const jwt_resp = resp.data;
      setJwt(jwt_resp);
    });
  };

async function loginUser(iuser:ILogin) {
  try {
    fetchToken();
    console.log(jwt);
    cookies.set("jwt",jwt)
  }
  catch (e) {
    alert(e)
  }
}

  return (
    <form className="flex max-w-md flex-col gap-4" 
    >
      <div>
        <h1>{email}</h1>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Your email" 
          />
        </div>
        <TextInput
          id="email"
          placeholder="name@flowbite.com"
          required
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Your password"
          />
        </div>
        <TextInput
          id="password"
          required
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">
          Remember me
        </Label>
      </div>
      <Button type="button" onClick={onButtonClick}>
        Submit
      </Button>
      {/* <Button onClick={testClick}>
      Test
      </Button> */}
    </form>
  )
}

