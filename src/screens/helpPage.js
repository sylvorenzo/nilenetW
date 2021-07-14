import React, { Component } from 'react';  





class Asker extends Component {




    render() { 



       return( 


  <span>

  <h1>FAQ</h1>
 <div class="accordion">
  <div>
    <input type="radio" name="example_accordion" id="section1" class="accordion__input"></input>
    <label for="section1" class="accordion__label"> Will confidentitial information be shared with other users ?</label>
    <div class="accordion__content">
      
      <p>
        No, sensitive informatioon will only be accessible to the authorised personel
      </p>
    </div>
  </div>

  <div>
    <input type="radio" name="example_accordion" id="section2" class="accordion__input"></input>
    <label for="section2" class="accordion__label">How to register for your business</label>
    <div class="accordion__content">
      <p>Follow the given link</p>
      <p>
      <a href=" https://eservices.cipc.co.za/Search.aspx">Click here</a>
       
      </p>
    </div>
  </div>
  <div>
    <input type="radio" name="example_accordion" id="section3" class="accordion__input"></input>
    <label for="section3" class="accordion__label">Are you required to share banking details?</label>
    <div class="accordion__content">
      <p>No</p>
      <p>
        Legally we are not inclined to request or prompt you to share any banking details as that will be going against our user agreement policy.
      </p>
    </div>
  </div>
</div>


 <h1>Suggested for you</h1>
 <div class="accordion">
  <div>
    <input type="radio" name="example_accordion" id="section4" class="accordion__input"></input>
    <label for="section4" class="accordion__label">Update Profile</label>
    <div class="accordion__content">
      
      <p>
        Follow link to update your profile
      </p>
    </div>
  </div>

  <div>
    <input type="radio" name="example_accordion" id="section5" class="accordion__input"></input>
    <label for="section5" class="accordion__label">Forgot Password?</label>
    <div class="accordion__content">
      <p>Reset Your Password</p>
      <p>
      
       Resetting your password is easy. We'll email or text you a link to reset it via the email address or phone number you provided.
      </p>
    </div>
  </div>
  <div>
    <input type="radio" name="example_accordion" id="section6" class="accordion__input"></input>
    <label for="section6" class="accordion__label">No access to email address?</label>
    <div class="accordion__content">
    
      <p>
There are instances when you no longer use or have access to the email address used to register your LinkedIn account. We suggest first trying to sign in with a secondary email address or phone number that's associated with your account. We allow you to sign in with any email address or phone number associated with your account.      </p>
    </div>
  </div>
</div>

</span>
    );
  }
}
 
export default Asker;