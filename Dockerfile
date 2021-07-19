# Specify the base image
FROM node:14-alpine

# Set your github username (OPTIONAL)
LABEL username="alpha037"

# Set the working directory
WORKDIR /usr/src/app

# Copy over the depedencies
# and install them. You can
# also use "npm ci"
COPY package*.json ./
RUN npm install

# Copy over the source code
COPY . .

# Expose the necessary port
EXPOSE 3000

# Finally, serve your app
CMD [ "npm", "run", "start" ]
