import AV from 'leancloud-storage'

var APP_ID = '2coUjgjHTgL0QDXu4c9HSpxN-gzGzoHsz';
var APP_KEY = 'VK5nYfJoStsbbxyWkfabERzY';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

/*var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  console.log('LeanCloud Rocks!');
})*/

export default AV

export function signUp(username, password, successFn, errorFn) {
  var user = new AV.User();
  user.setUsername(username);
  user.setPassword(password);
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser);
    successFn.call(null, user);
  }, function(error) {
    errorFn.call(null, error);
  })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

