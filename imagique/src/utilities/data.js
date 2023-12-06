const categories = [
  {
    name: "3D",
  },
  {
    name: "Abstract",
  },
  {
    name: "Animals",
  },
  {
    name: "Art",
  },
  {
    name: "Black and White",
  },
  {
    name: "Cars",
  },
  {
    name: "Fantasy",
  },
  {
    name: "Holidays",
  },
  {
    name: "Love",
  },
  {
    name: "Minimalism",
  },
  {
    name: "Music",
  },
  {
    name: "Technologies",
  },
  {
    name: "Other",
  },
];

const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;

  return query;
};

const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']
  {
    image {
      asset -> {
        url
      }
    }, 
   _id,
   destination,
   postedBy -> {
    _id, 
    userName,
    image
   },
   save[] {
    _key,
    postedBy -> {
        _id,
        userName,
        image
    },
   },
 }`;

  return query;
};

const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
    image {
        asset -> {
          url
        }
      }, 
     _id,
     destination,
     postedBy -> {
      _id, 
      userName,
      image
     },
     save[] {
      _key,
      postedBy -> {
          _id,
          userName,
          image
      },
     },
}`;

const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export {
  categories,
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
  searchQuery,
  feedQuery,
  pinDetailMorePinQuery,
  pinDetailQuery,
};
