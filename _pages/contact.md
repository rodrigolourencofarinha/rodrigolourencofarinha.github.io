---
layout: page
title: Contact
description: "Contact Rodrigo Farinha about research, teaching, speaking, consulting, and collaboration opportunities."
permalink: /contact/
comments: false
---

<form id="contact-form" name="contact" action="https://formspree.io/f/mpwvkbpq" method="POST">
<p class="mb-4">Send me a message. I’ll reply as soon as possible.</p>
<div class="form-group row">
<div class="col-md-6">
<label for="contact-name"><strong>Name</strong></label>
<input id="contact-name" class="form-control" type="text" name="name" autocomplete="name" required>
</div>
<div class="col-md-6">
<label for="contact-email"><strong>Email address</strong></label>
<input id="contact-email" class="form-control" type="email" name="_replyto" autocomplete="email" required>
</div>
</div>
<div class="form-group">
<label for="contact-message"><strong>Message</strong></label>
<textarea id="contact-message" rows="8" class="form-control" name="message" required></textarea>
</div>
<p class="small text-muted">This form is processed by Formspree. See the <a href="{{ site.baseurl }}/privacy/">privacy notice</a>.</p>
<button class="btn btn-dark" type="submit">Send</button>
</form>
