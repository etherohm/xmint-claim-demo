import { Form, Input, Button } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import Image from 'next/image'

export default function Home() {
  /*
  - Grab email
  - Validate
  - Mint
  - Check Mint
  - Let user know!
  */

  const handleOnSubmit = async (e) => {

    try {
    e.preventDefault();
    let email = e.target[0].value;
    var validEmailRegex = RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (validEmailRegex.test(email)){
      // mint
      Swal.fire({
        title: 'Hang tight.... Minting!',
        text: 'This screen will update when we have more information regarding this request!',
        showConfirmButton: false,
        allowOutsideClick: false
      }
      )
      let crossmintid;
      await fetch(`api/mint?recipient=${email}`)
      .then((response) => response.json())
      .then((responseData) => crossmintid = responseData.id)
      .catch(error => console.log('error', error));
      console.log("crossmintid", crossmintid);

      var status;
      await fetch(`api/check?crossmintid=${crossmintid}`)
      .then((response) => response.json())
      .then((responseData) => status = responseData.onChain.status)
      .catch(error => console.log('error', error));

      while(status == "pending"){
        await new Promise(r => setTimeout(r, 2000));
        await fetch(`api/check?crossmintid=${crossmintid}`)
        .then((response) => response.json())
        .then((responseData) => status = responseData.onChain.status)
        .catch(error => console.log('error', error));
      }
      console.log("status", status);

      if (status == "success"){
        // client side only 
        await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, e.target, process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
        e.target.reset()
        Swal.fire({
            title: 'NFT Minted!',
            text: `We have sent instructions on how to claim your NFT to: ${email}`,
            icon: "success",
            allowOutsideClick: false}
          )
      } else {
        Swal.fire(
          'Minting Error',
          "Error minting the NFT.\nCrossmint ID: " + (crossmintid || "None"),
          'error'
        )
      }
    }
    else {
      Swal.fire(
        'Input Error',
        "Please provide a proper email.",
        'error'
      )
    }
    
  }
  catch (e) {
    console.log("General Issue.", e);
  }
  };

    return (
      <div className="App">
        <title>Claim your NFT!</title>
        <header className="App-header">
          <Image src="/logo.svg" width="200" height="200" alt="logo" />
          <p>
          Congrats, you have been awarded a NFT. Enter your email below to claim it!
          </p><Form onSubmit={handleOnSubmit}>
          <Form.Field 
            id='user_email'
            control={Input}
            name='user_email'
            placeholder='Email…'
            required
            icon='mail'
            iconPosition='left'
            width={8}
          />
          <Button type='submit' color='green'>Claim!</Button>
        </Form>
        </header>
      </div>
    );
}
