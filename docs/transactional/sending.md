---
sidebar_position: 7
sidebar_label: Sending examples
---

# Sending examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Below, we'll walk you through examples of sending emails using the specified configuration:

- **Hostname**: smtp.example.com
- **Port**: 465
- **Encryption**: Regular TLS
- **Username**: "user"
- **Password**: "some-long-secure-token"

<Tabs>
  <TabItem value="phpmailer" label="PHPMailer" default>

In this example, we'll utilize [PHPMailer](https://github.com/PHPMailer/PHPMailer) to dispatch a transactional welcome email.

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'path/to/composer/vendor/autoload.php';

$mail->isSMTP();
$mail->Host = 'smtp.example.com';
$mail->SMTPAuth = true;
$mail->Username = 'user';
$mail->Password = 'some-long-secure-token';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('no-reply@example.com', 'My Awesome SaaS');
$mail->addReplyTo('new-user@example.com', 'John Doe');
$mail->isHTML(true);
$mail->Subject = "Welcome!";
$mail->Body = '<p>Welcome to our awesome SaaS service!</p>';
$mail->AltBody = 'Welcome to our awesome SaaS service!';

$mail->send();
```

:::note

It's important to note that the `SMTPSecure` option is set to `ssl`. We've discussed the reasoning behind this choice earlier [here](/docs/transactional/smtp-configuration#configuring-tls).

:::

  </TabItem>

  <TabItem value="nodemailer" label="NodeMailer">

In this example, we'll utilize [NodeMailer](https://nodemailer.com) to dispatch a transactional welcome email.

```js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 465,
  secure: true,
  auth: {
    user: "user",
    pass: "some-long-secure-token",
  },
});

transporter.sendMail({
  from: '"My Awesome SaaS" <no-reply@example.com>',
  to: '"John Doe" <new-user@example.com>',
  subject: "Welcome!",
  text: "Welcome to our awesome SaaS service!",
  html: "<p>Welcome to our awesome SaaS service!</p>",
});
```

  </TabItem>

</Tabs>

## Key Considerations

- **Reusing SMTP Connection**: One might wonder if it's beneficial to reuse the SMTP connection to send multiple emails over the same TLS connection. While it's technically feasible, it introduces unnecessary complexity without significant advantages.

- **Queueing System**: Instead of reusing connections, it's more efficient to implement a robust queueing system. This ensures that you don't inundate the SMTP server with too many simultaneous connections. Ideally, each email should be sent over its own dedicated connection.

- **Connection Speed**: The process of setting up TCP and TLS is typically swift, meaning the time taken to establish these connections is negligible in most scenarios.

- **Optimization**: Only consider advanced optimization strategies, such as reusing SMTP connections, if you encounter genuine issues. This might be relevant if you're dealing with an unstable network or if you're sending an exceptionally large volume of emails in a brief timeframe.

Remember, the key is to maintain a balance between efficiency and simplicity. Overcomplicating the process can lead to more challenges down the line.
