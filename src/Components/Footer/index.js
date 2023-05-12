import { Typography } from "antd";
import React from "react";

function Footer() {
    return (
        <div className="Footer">
            <Typography.Link href="tel:+84123456789">
                0123456789
            </Typography.Link>
            <Typography.Link href="https://www.google.com" target={'_blank'}>
                Privacy Policy
            </Typography.Link>
            <Typography.Link href="https://www.google.com" target={'_blank'}>
                Term of use
            </Typography.Link>
        </div>
    );
}

export default Footer;
