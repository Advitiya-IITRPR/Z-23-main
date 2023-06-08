import { Link } from "react-router-dom";

const Links = [
  {
    title: "Privacy Policy",
    link: "#privacy",
  },
  {
    title: "CANCELLATION AND REFUND",
    link: "#CANCELLATIONANDREFUND",
  },
  {
    title: "CONTACT US",
    link: "#CONTACTUS",
  },
];
const Legal = () => {
  return (
    <>
      <section className="sponser-main pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 sponser-content">
              <h3>Legal</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-main">
        <div className="container-fluid" styles={{ "margin-top": "10px" }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-bs-toggle="tab" href="#tc">
                Terms & Conditions
              </a>
            </li>
            {Links &&
              Links.map((item) => {
                return (
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href={item.link}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="tc">
              <h3>Terms & Conditions -</h3>
              <p>
                Smoking, drinking and other drug consumption are strictly
                prohibited and necessary action will be taken by the institute
                if a participant or visitor is found to be in possession of
                these items.
              </p>
              <p>
                Any damage to institution facilities and property provided to
                the participants would result in serious action and necessary
                reimbursement charges would have to be dealt by the participants
                who are found guilty.
              </p>
              <p>
                The college will not be responsible for any damage or loss of
                property or valuables stored in places of accommodation. Upon
                check-out, the Guest should settle all the accounts with regard
                to the services rendered and return the receipt to the
                organizers.
              </p>
              <p>
                Participants should strictly follow the curfew timings of IIT
                Ropar.
              </p>
              <p>
                No outside vehicles will be allowed into the campus during
                Zeitgeist. Random checks would be made to avoid any illegal stay
                at the campus. Any team failing to produce their
                electronic/physical receipts of accommodation would be heavily
                fined and disqualified.
              </p>
              <p>
                Any attempt to enter into a prohibited area in the venue will
                lead to eviction from the venue. We do not take responsibility
                for any material shown during a performance/act.
              </p>
              <p>
                Though we would try our best to ensure that all performances are
                respectful to every person present in the audience, it would be
                the responsibility of the performers if that isn't the case.
              </p>
              <p>
                We reserve the right to change, update, delete or add to the
                Terms at any time without notification to you. Any changes to
                the Terms will be effective immediately upon posting, and any
                continued use by you of the Website and/or the Services after
                changes have been posted constitute your acceptance to those
                changes.
              </p>
              <p>
                It is the responsibility of the participants to get themselves
                acquainted with the rules of each event. And the organizing team
                holds every right to disqualify participants in cases the rules
                are not followed or violated. The decision of the organizing
                team and judges in all events will be final.
              </p>
            </div>
            <div className="tab-pane fade" id="privacy">
              <h3>Privacy Policy -</h3>
              <p>
                Zeitgeist, IIT Ropar operates the{" "}
                <Link
                  to="http://zeitgeist.org.in/"
                  target={"_blank"}
                  className="text-yellow-400"
                >
                  {" "}
                  {"http://zeitgeist.org.in/"}
                </Link>{" "}
                website, which provides the SERVICE. If anyone chooses to use
                our Service, the Zeitgeist 23 website, this page is meant to
                inform website visitors of our policies with the collection,
                use, and sharing of Personal Information.{" "}
              </p>
              <p>
                You consent to the gathering and use of information about you in
                accordance with this policy if you choose to use our Service.
                The Personal Information we gather is utilized to deliver and
                enhance the Service. We won't use or disclose your information
                in any other way than what is stated in this privacy statement.
                The terms used in this Privacy Policy have the same meanings as
                in our Terms and Conditions, which are accessible at{" "}
                <Link
                  to="http://zeitgeist.org.in/"
                  target={"_blank"}
                  className="text-yellow-400"
                >
                  {" "}
                  {"http://zeitgeist.org.in/"}
                </Link>{" "}
                , unless otherwise defined in this Privacy Policy. Information
                Collection and Use We may request certain personally
                identifiable information from you in order to improve your
                experience while using our service, including but not limited to
                your name, phone number, and postal address. We will use the
                data we gather to identify or get in touch with you. Cookies
                Cookies are little data files that are frequently used as an
                anonymous unique identifier. These are downloaded to your
                computer's hard drive from the website you visited and
                transmitted to your browser.
              </p>
              <p>
                These "cookies" are used on our website to collect data and
                enhance our service. These cookies are available for acceptance
                or rejection, and you are informed when one is being delivered
                to your computer. You might not be able to utilize all of our
                Service if you decide to reject our cookies. Service Providers
                For the reasons listed below, we might work with independent
                businesses and people:
                <ul style={{ listStyle: "circle" }}>
                  <li>1. In providing our Services</li>
                  <li>2. To be an agent to support our Services</li>
                  <li>3. To perform Service-related services</li>
                  <li>4. To assist us in analyzing how our Service is used</li>
                </ul>
              </p>
              <p>
                These third parties have access to your Personal Information
                that you will provide at the time of registration, and we wish
                to let our Service users know about it. To accomplish on our
                behalf the tasks we have given them. They are required to keep
                the information private and to use it only for the stated
                purpose. The information will not be misused. Security We
                appreciate your confidence in entrusting us with your personal
                information, so we make every effort to protect it using legally
                permissible means. However, keep in mind that no form of
                electronic storage or communication via the internet is 100%
                secure and dependable, and we cannot guarantee its total
                security. Links to Other Sites Links to other websites may be
                found on our service. A third-party link will take you to that
                website if you click on it. Please take note that we do not run
                these external websites. Because of this, we strongly suggest
                that you read the privacy policies of these websites. We have no
                control over, and accept no responsibility for, any third-party
                website or services' content, privacy policies, or practices.
                Children’s Privacy Changes to This Privacy Policy On occasion,
                we might change our privacy policy. Consequently, we suggest
                that you check this page frequently for any updates. By
                publishing the revised Privacy Policy on this website, we'll let
                you know whenever there are any changes. Immediately following
                their posting on this website, these modifications take effect.
                With the help of the GDPR Privacy Policy Generator, this privacy
                statement was made.
              </p>
            </div>
            <div className="tab-pane fade" id="CANCELLATIONANDREFUND">
              <h3>CANCELLATION AND REFUND -</h3>
              <p>
                We understand that unexpected situations could prevent attendees
                from participating in our event. Below is our cancellation
                policy that outlines the terms and conditions for canceling your
                registration in the events that will take place during
                Zeitgeist.
              </p>
              <h5>Cancellation by Attendee</h5>
              <p>
                If a participant cannot attend any event for any reason, then
                the organizing team is not liable, and no refund will be
                initiated.
              </p>

              <h5>Cancellation by Organizer</h5>
              <p>
                If due to some unfortunate circumstances, the organizer needs to
                cancel the event, attendees will receive a full refund of their
                registration fee. However, the organizer will not be responsible
                for any other expenses incurred by the attendees, such as travel
                or accommodation costs.
              </p>

              <h5>Refunds</h5>
              <p>
                Refunds will be processed within a month. Refunds will be issued
                in the same form of payment as the original registration, and
                any applicable cancellation fees will be deducted from the
                refund amount.
              </p>

              <h5>Communication</h5>
              <p>
                If you have any questions or concerns regarding the cancellation
                policy, please get in touch with us at 7409776341.
                <br />
                <strong>NOTE:</strong>
                By registering for an event, attendees agree to abide by the
                above cancellation policy. The organizer reserves the right to
                amend this policy at any time without prior notice.
              </p>
            </div>
            <div className="tab-pane fade" id="CONTACTUS">
              <h3>CONTACT US -</h3>
              <h5>
                If you have any query or concern related to Zeitgeist, contact -
              </h5>
              <h5>Vasu Bansal</h5>
              <p>90411 90009</p>

              <h5>Kunal Malhotra</h5>
              <p>80917 41187</p>

              <h5>Drishti Jain</h5>
              <p>84374 25181</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Legal;
