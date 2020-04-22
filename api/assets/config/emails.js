exports.emailQuoteTemplate = (isValid, quote, frontendLink) => `
<center>
    <table border="0" cellpadding="20" cellspacing="0" height="100%" width="100%" style="background-color:#181818">
        <tbody>
            <tr>
                <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-radius:6px">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h1 style="font-family:Arial, Helvetica, sans-serif;color:#ffd800;font-size:28px;line-height:110%;margin-bottom:30px;margin-top:0;padding:0">FunctionProject</h1>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-radius:6px;">
                                        <tbody>
                                            <tr>
                                                <td align="left" valign="top" style="line-height:150%;font-family:Helvetica;font-size:14px;color:rgb(222, 222, 222);padding:30px;box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, .25);border: 1px solid black;border-radius: 1rem;">
                                                    <h2 style="font-size:22px;line-height:28px;margin:0 0 12px 0;">
                                                        La citation que vous avez proposée a été ${(isValid) ? "validée" : "supprimée"}.
                                                    </h2>
                                                    <p style="margin: 0 0 12px 0;">
                                                        <a style="color: #ffd800;" href="${frontendLink}/functions/randomQuote">Lien vers la fonction randomQuote de FunctionProject.</a>
                                                    </p>
                                                    ${(!isValid) ? `
                                                        <p style="margin: 0 0 12px 0;">
                                                            Si votre citation a été supprimée et vous pensez que c'est une erreur, contactez-moi à cette adresse email : <a style="color: #ffd800;" href="mailto:contact@divlo.fr">contact@divlo.fr</a>.
                                                        </p>
                                                    ` : ""}
                                                    <div>
                                                        <p style="padding:0 0 10px 0">
                                                            La citation en question : <br/>
                                                            " ${quote.quote} "
                                                            <br/>
                                                            - ${quote.author}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</center>
`;

exports.emailUserTemplate = (subtitle, buttonText, url, footerText) => `
<center>
    <table border="0" cellpadding="20" cellspacing="0" height="100%" width="100%" style="background-color:#181818">
        <tbody>
            <tr>
                <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-radius:6px">
                        <tbody>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h1 style="font-family:Arial, Helvetica, sans-serif;color:#ffd800;font-size:28px;line-height:110%;margin-bottom:30px;margin-top:0;padding:0">FunctionProject</h1>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;border-radius:6px;">
                                        <tbody>
                                            <tr>
                                                <td align="left" valign="top" style="line-height:150%;font-family:Helvetica;font-size:14px;color:rgb(222, 222, 222);padding:30px;box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, .25);border: 1px solid black;border-radius: 1rem;">
                                                    <h2 style="font-size:22px;line-height:28px;margin:0 0 12px 0;">
                                                        ${subtitle}
                                                    </h2>
                                                    <a href="${url}" style="display:inline-block;font-weight:500;font-size:16px;line-height:42px;font-family:'Helvetica',Arial,sans-serif;width:auto;white-space:nowrap;height:42px;margin:12px 5px 12px 0;padding:0 22px;text-decoration:none;text-align:center;border:0;border-radius:3px;vertical-align:top;background-color: #343a40;border-color: #343a40;" target="_blank" rel="noopener noreferrer"><span style="display:inline;font-family:'Helvetica',Arial,sans-serif;text-decoration:none;font-weight:500;font-style:normal;font-size:16px;line-height:42px;border:none;color: #fff;">${buttonText}</span></a>
                                                    <br>
                                                    <div>
                                                        <p style="padding:0 0 10px 0">${footerText}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</center>
`;