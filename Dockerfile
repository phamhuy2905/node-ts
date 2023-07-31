FROM node:18

WORKDIR /app

COPY package*.json package-lock.json ./  

RUN npm install 


# RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build

CMD [ "npm", "run", "build" ]