var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
var cors = require('cors');


// GraphQL schema
var schema = buildSchema(`
type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
    learn(id: Int!): Learn
    learns: [Learn]
  },

  type Learn{
    id: Int
    title: String
    video: String
    description: String
    publishedAt: String
    catergory: String
    author: String
    site: String
    content: String
  },
  type Person {
    id: Int
    userName: String
    firstName: String
    lastName: String
    type: String
    age: Int
    shark: String
  }
`);

//Sample Learn
var learns = [
  {
    id: 1,
    title: 'Cross Over',
    video:'http://188.138.57.87/tb/e/5b/the_crossover_dribble_basketball_h264_67712.mp4',
    img:'https://www.basketballtraininggrounds.com/images/crossover-dribble.jpg',
    description:'le crossover est une variation du dribble, accompagnée d\'un changement de main dans le but de passer un adversaire direct.',
    publishedAt:'01-01-2021',
    catergory:'Technologie',
    author:'Auteur: Jean jack',
    site:'www.google.com',
    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
  },
  {
    id: 2,
    title: 'Ankle Breaker',
    video:'http://188.138.74.105/tb/1/67/5_ways_to_break_defender_s_ankles_with_tjass_h264_31227.mp4',
    img:'https://arizonasports.com/wp-content/uploads/2018/11/ayton-collison-1.jpg',
    description:'L\'Ankle Breaker fait référence à un mouvement de dribble avec le ballon, qui fait perdre l\'équilibre au défenseur ou tombe sur le terrain.',
    publishedAt:'01-01-2021',
    catergory:'Biologie',
    author:'Auteur: Jean jack',
    site:'www.google.com',
    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
  },
  {
    id: 3,
    title: 'Double Clutch',
    video:'http://50.30.35.170/tb/0/02/how_to_switch_hand_lay-up_double_clutch_h264_31751.mp4',
    img:'https://www.doubleclutch.uk/wp-content/uploads/2020/07/KB21cgen3-1120x630.jpeg',
    description:'Un double clutch est un mouvement associé à un lay-up ou un dunk; c\'est un changement de position de balle dans les airs',
    publishedAt:'01-01-2021',
    catergory:'Politique',
    author:'Auteur: Jean jack',
    site:'www.google.com',
    content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
  },
  {
      id: 4,
      title: 'Meteor Jam',
      video:'http://188.138.74.102/tb/7/10/kagami_taiga_and_dwight_howard_s_meteor_jam_h264_32822.mp4',
      img:'https://cdn.vox-cdn.com/thumbor/Zx2_6-lXOaclj21Fm4MZ4K_ebao=/67x0:787x480/920x613/filters:focal(67x0:787x480):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/45736174/dean.0.0.jpg',
      description:'Dunk effectué par Dwight Howard lors du NBA All-Star Game quiconsiste à lancer le ballon dans le cercle lorsqu\'on est au-dessus.Il est aussi appelé « Meteor Jam »',
      publishedAt:'01-01-2021',
      catergory:'Film',
      author:'Auteur: Jean jack',
      site:'www.google.com',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
    },
    {
      id: 5,
      title: 'Hand One',
      video:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      description:'Decription 5',
      publishedAt:'01-01-2021',
      catergory:'Animaux',
      author:'Auteur: Jean jack',
      site:'www.google.com',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
    },
    {
      id: 6,
      title: 'Slam Dunk',
      video:'https://860567187.tapecontent.net/radosgw/ZDBK6xMJyjhq9B4/xqNT8Mzx8N2w0I40giwmi0-qmJfdxiyQJthguvLz4PKnylsC864cM1sVua51dS1MnJ_2K3u5D7zP59fUfLO4Mp2XZdO4mCukNLENGL1dP1x8uqQF6VRM5FBB7t_jL_xN-TJvCCBvkukprSCg-5k0M3l2caTMakyhz2vgWU28w5UF6ZZTZm3TVs7INOYIJytHTVu06D2TKASnLAvTbPCIv4sWlifb_bdKfwJ-br9K1MTN0gDvhtgz0gvkZdwB8xZg7t4I29tnIYzxA9tOD7frhWwcv0aIL5HWRxrMWm_MoT1anK5S6_Zlw2dM8Kk/Black+Clover+-+161+VOSTFR.mp4',
      description:'Decription 6',
      publishedAt:'01-01-2021',
      catergory:'Voyage',
      author:'Auteur: Jean jack',
      site:'www.google.com',
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.'
      
    },
]

// Sample users
var users = [
    {
      id: 1,
      userName:'Oak18',
      firstName: 'Brian',
      lastName:'Barns',
      type:'Artist',
      age: '21',
      shark: 'Great White Shark'
    },
    {
      id: 2,
      userName:'OPT',
      firstName: 'Kim',
      lastName:'Chang',
      type:'Label',
      age: '22',
      shark: 'Whale Shark'
    },
    {
      id: 3,
      userName:'Mango',
      firstName: 'Faith',
      lastName:'Salva',
      type:'Artist',
      age: '23',
      shark: 'Hammerhead Shark'
    },
    {
      id: 4,
      userName:'Sak85',
      firstName: 'Joseph',
      lastName:'Nkanu',
      type:'Artist',
      age: '23',
      shark: 'Tiger Shark'
    },
    {
      id: 5,
      userName:'Chuck',
      firstName: 'Joy',
      lastName:'Frietz',
      type:'Label',
      age: '25',
      shark: 'Hammerhead Shark'
    },
    {
        id: 6,
        userName:'Outis',
        firstName: 'Schandroid.Net',
        lastName:'SNN',
        type:'Label',
        age: '24',
        shark: 'Portail Shark'
      },
  ];
  
  // Return a single user by it's ID
  var getUser = function(args) {
    var userID = args.id;
    return users.filter(user => user.id === userID)[0];
  }

  // Return a list of users with an optionnal property
var retrieveUsers = function(args) {
    if(args.shark){
        var shark = args.shark;
        return users.filter(user => user.shark === shark);
    }
    else{
        return users;
    }
  }

//Return a single learn by it's ID
var getLearn = function(args){
  var learnID = args.id;
  return learns.filter(learn => learn.id === learnID)[0];
}

//Return a list of learn
var retrieveLearns = function(args){
  return learns;
}
// Root resolver
var root = {
    user: getUser,  // Resolver function to return user with specific id
    users: retrieveUsers,
    learn: getLearn,
    learns:retrieveLearns
  };
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
const gqL = express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
});
app.use('/graphql', gqL);

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
