# Crossmint Claim Demo

This demo is aimed at letting users put their email and receive the same NFT as others. This can be used as a proof of attendance, for promotions and many other things. As of now this is a super streamlined demo with no checks to prevent multiple mints or no functionality to customize past a single NFT.

# Running this

To deploy to netlify or vercell just build the project using `yarn build`, it'll run on port 3000 if on localhost.

# What is needed?

You need:
- Crossmint project id + api key. (crossmint.io || staging.crossmint.io)
- EmailJS service, template and user id's. (emailjs.com)
- Crossmint endpoint for your key (docs.crossmint.io)
- Fill out .env data
- Edit logo.svg

You can add other metadata parts and checks as you build out.
