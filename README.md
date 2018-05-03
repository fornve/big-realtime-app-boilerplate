Framework
=========

Purpose
-------
Boilerplate for starting quick and scalable realtime applications

Elements
--------

* Backend
+ Expressjs (as api backend)
+ NGINX + Letsencrypt.org reverse proxy / lb
+ MySQL Dao https://github.com/dresende/node-orm2 
+ RabbitMQ
+ Socket.io / Axios

* Frontend
+ Vue client
- Dashboard
- User Signup/Login/Password recovery/Settings
- User admin + permissions
- Simple Messaging (no priority)
- Posts (no priority)
- Templating System (no priority)

* Legal
+ Terms & Conditions sample
+ Privacy Policy

* Scaling


Message Brokers
===============

When to keep rabbitmq and when GCP Pubsub?

That decision should be done on the beginning. 

RabbitMQ will be better for smaller app. A& it works in memory it has lower latency so should be cheaper to run but tougher or challenging to scale horizontally. You can run it whenever you want.

Pubsub is reliable and does not require maitenance from your side. It has quite big free tier which would be enough for development. Pricing is based on amount of data processed - so consider it during development.
