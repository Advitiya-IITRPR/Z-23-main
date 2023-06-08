const Faq = () => {
  return (
    <>
      <section className="sponser-main pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 sponser-content">
              <h3>faq’s</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-main">
        <div className="container-fluid" styles={{ "margin-top": "10px" }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#Registration"
              >
                Registration & General
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#Campus">
                Campus Facilities
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#Competitions">
                Competitions
              </a>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="#Concert">
                Concert & Pass
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#Accomodation">
                Accomodation & CL
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="Registration">
              <h3>Registration & General -</h3>
              <h5>
                Q 1. What are the dates for Zeitgeist 2023?
              </h5>
              <p>
                The 8th edition of Zeitgeist will be held from 23rd March to 26th March 2023. Get ready for this 4-day exhilarating fiesta.
              </p>

              <h5>
                Q 2. How can I register for Zeitgeist ?
              </h5>
              <p>
                Registration can be done from <a href="https://zeitgeist.org.in/events" className="underline text-yellow-300 hover:text-red-400" target={"_blank"} rel="noreferrer">HERE</a>
              </p>

              <h5>
                Q 3. Why is registration necessary?
              </h5>
              <p>
                Registering on the website will generate a unique ID number for you. This number is essential for participation or entry to all the activities going on during Zeitgeist! If you want to register for a competition or accommodation or collect concert passes, you’ll need to have an unique ID number and a college ID. Your ID number is essential to access the best things the festival has to offer.
              </p>

              <h5>
                Q 4. What is your unique ID?
              </h5>
              <p>
                You will get a unique ID on your screen after registering. This is your ID number which will be used to identify yourself while attending Zeitgeist. Please note this number.
              </p>

              <h5>
                Q 5. What to do after completing the registration process ?
              </h5>
              <p>
                After registering, you will get an email that will confirm your registration. Definitely keep up with our social media handles and regularly check your mail. After this, all you need to do is attend Zeitgeist :)
              </p>
              <h5>
                Q 6. Are vehicles allowed inside the campus ?
              </h5>
              <p>
                NO, we are not responsible for providing any parking facility.
              </p>
              <h5>
                Q 7. What are the restrictions on entry and exit from campus during Zeitgeist ?
              </h5>
              <p>
                Entrance on campus begins at 7 AM for all participants and visitors on all four days. If you are not availing accommodation, you will be required to leave the campus by 10 PM. In case of violation of this, penalty will be imposed.
              </p>
              <h5>
                Q 8. We are a group of friends and we want to attend Zeitgeist just for fun. We are not specifically interested in participating in events. Are we allowed to attend?
              </h5>
              <p>
                Yes, you can definitely attend Zeitgeist by registering from your respective colleges. However, for accommodation, you can contact the Heads of Hospitality and Public Relations and request for accommodation. Accommodation would be confirmed strictly subject to availability.
              </p>
              <h5>
                Q 9. What procedure do we have to follow once we reach IIT Ropar?
              </h5>
              <p>
                You need to come to the Accommodation Desk, Students Activity Centre (SAC) along with your college identity card. You will be allotted your place to stay on campus and given a registration booklet. In the case of a big contingent, a contingent leader needs to present the ID cards of all the people in his contingent at the accommodation desk along with a list of all the people. Accommodation would be strictly on a shared basis.
              </p>
            </div>
            <div className="tab-pane fade" id="Campus">
              <h3>Campus Facilities -</h3>
              <h5>
                Q 1. What is the nearest railway station or airport to reach Ropar?
              </h5>
              <p>
                The Rupnagar railway station is in close proximity to IIT Ropar campus. Chandigarh Airport is the nearby airport if you are arriving via air. From Chandigarh, one can take a cab to reach Ropar.
              </p>

              <h5>
                Q 2. What is the convenient mode of transportation in Ropar ?
              </h5>
              <p>
                You can get both an Autorickshaw and Taxi facility. You can contact our hospitality team if you have any query regarding this.
              </p>

              <h5>
                Q 3. Is a hospital facility available ?
              </h5>
              <p>
                A well equipped medical center is in the campus of IIT Ropar itself and we have an ambulance ready in case of any emergency.
              </p>

              <h5>
                Q 4. What ID proofs are required ?
              </h5>
              <p>
                It is advised to carry one valid ID proof like aadhar card or PAN card along with your institute ID card.
              </p>

              <h5>
                Q 5. How will the visitors and participants get to know the timing and venues of the events during fest?
              </h5>
              <p>
                The timing and venue for each event will be organized via our social media handles.
              </p>
              <h5>
                Q 6. Is an ATM facility available nearby ?
              </h5>
              <p>
                ATM facility is available at the campus of IIT Ropar.
              </p>
              <h5>
                Q 7. What are the available food options during the fest ?
              </h5>
              <p>
                There will be numerous food options available during the Zeitgeist consisting of renowned food outlets and local delicacies.
              </p>
              <h5>
                Q 8. What are the facilities at Zeitgeist for visitors?
              </h5>
              <p>
                We have accommodation facilities for the visitors where they will get a place along with the hospitality kit and meals for the day.
              </p>
            </div>
            <div className="tab-pane fade" id="Competitions">
              <h3>Competitions -</h3>
              <h5>
                Q 1. How can I register for competitions and events at Zeitgeist?
              </h5>
              <p>
                First you need to get registered for Zeitgeist 2023 and get your unique ID number. After that you can go to the desired event and register for it.
              </p>

              <h5>
                Q 2. Who can participate? Is there any fee involved in registration?
              </h5>
              <p>
                Any college student can participate in the events. The participation fee is mentioned in the rulebook for each event.
              </p>

              <h5>
                Q 3. Is there an option for on-spot registration?
              </h5>
              <p>
                It will depend on some parameters and availability. It is advised to register online to secure your spot.
              </p>

              <h5>
                Q 4. Can an individual register for any number of events?
              </h5>
              <p>
                YES, there is no such limit.
              </p>


            </div>
            {/* <div class="tab-pane fade" id="Concert">
              <h3>Concert & Pass -</h3>
              <h5>
                Q 1. Contrary to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC ?
              </h5>
              <p>
                Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              </p>

              <h5>
                Q 2. Contrary to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC ?
              </h5>
              <p>
                Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              </p>

              <h5>
                Q 3. Contrary to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC ?
              </h5>
              <p>
                Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              </p>

              <h5>
                Q 4. Contrary to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC ?
              </h5>
              <p>
                Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              </p>

              <h5>
                Q 5. Contrary to popular belief, Lorem Ipsum is not simply
                random text. It has roots in a piece of classical Latin
                literature from 45 BC ?
              </h5>
              <p>
                Lorem Ipsum is not simply random text. It has roots in a piece
                of classical Latin literature from 45 BC, making it over 2000
                years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              </p>
            </div> */}
            <div className="tab-pane fade" id="Accomodation">
              <h3>Accomodation & CL -</h3>
              <h5>
                Q 1. When will the registration for accommodation start?
              </h5>
              <p>
                Registration for accommodation will start from DATE 10/03/2023. <a target={"_blank"} href='https://www.townscript.com/e/accommodation-143042' className='text-yellow-200 hover:text-yellow-400'> Learn More</a>
              </p>

              <h5>
                Q 2. What is the procedure for online payment of accommodation charges?
              </h5>
              <p>
                You can pay via our website payment portal.
              </p>

              <h5>
                Q 3. When will my accommodation be confirmed?

              </h5>
              <p>
                Once you complete the process for accommodation through our website, you will receive confirmation mail about your accommodation.

              </p>

              <h5>
                Q 4. What facilities will be provided under accommodation?
              </h5>
              <p>
                Under the accommodation, we will provide bedding and three meals for the day.
              </p>

              <h5>
                Q 5. Where will accommodation be provided?
              </h5>
              <p>
                The accommodation will be provided within student residences at the campus of IIT Ropar.
              </p>
              <h5>
                Q 6. Will all team members reside together, or will they be allotted randomly?
              </h5>
              <p>
                The team members will get to stay together if they register in a group; otherwise, the system will be for an individual.
              </p>
              <h5>
                Q 7. What are the accommodation charges?
              </h5>
              <p>
                <b>For accomodation</b><br/>
                500 per day (without meal)<br/>
                For 2 days accomodation : 10% off - 900<br/>
                For 3 days accomodation : 15% off - 1275<br/>
                For 4 days accomodation : 20% off - 1600
              </p>
              <h5>

                Q 8. Who is a Contingent Leader (CL)?

              </h5>
              <p>
                A contingent leader is a senior student from your college who will lead and supervise your college contingent throughout the fest. CL acts as a representative for all accommodation-related queries between Zeitgeist and his/her college, thus conveying all Zeitgeist information to students of his/her college. The CL is also responsible for applying for accommodation for their college students. After completing their duties, the CL gets a certificate of appreciation from Zeitgeist IIT Ropar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
