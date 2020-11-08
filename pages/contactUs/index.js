import React from "react";
import CallIcon from "@material-ui/icons/Call";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EmailIcon from "@material-ui/icons/Email";
import LanguageIcon from "@material-ui/icons/Language";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Link from "next/link";
import HideAppBar from "../../src/components/header";

export default function contact() {
  return (
    <div className="margin-body">
      <body>
        <HideAppBar />
        <div className="contact1">
          <div className="container-contact1">
            <div className="contact1-pic" data-tilt>
              <img src="img-01.png" />
            </div>

            <form>
              <div className="wrap-logo">
                <CallIcon fontSize="large" />
                <p className="details">09368539910 - 09358519910</p>
              </div>

              <div className="wrap-logo">
                <AssignmentIndIcon fontSize="large" />
                <p className="details">021-71053283</p>
              </div>

              <div className="wrap-logo">
                <AlternateEmailIcon fontSize="large" />
                <p className="details">
                  info@Narmafkar.Com – support@Narmafkar.Com
                </p>
              </div>

              <div className="wrap-logo">
                <EmailIcon fontSize="large" />
                <p className="details">500010609184</p>
              </div>

              <div className="wrap-logo">
                <LocationOnIcon fontSize="large" />
                <p className="details">خیابان فلسطین – فلسطین 28 – پلاک 95</p>
              </div>

              <div className="wrap-logo">
                <LanguageIcon fontSize="large" />
                <Link href="http://narmafkar.com" target="blank">
                  <p style={{ cursor: "pointer" }} className="details">
                    www.Narmafkar.Com
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}
