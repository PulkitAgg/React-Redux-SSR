'use strict'
import "@babel/polyfill";

const userController = {

  fetchUserInfo: function (){
        // let resp = await questionModel.fetchAllQuestions() ;
        // return resp;
          return [
            {
              id: 1,
              upvotes: 130,
              title: "Fianto Duri, the complete tutorial",
              author: "RubeusH",
              date: new Date("2017-04-14T15:30:00.000Z")
            },
            {
              id: 2,
              upvotes: 126,
              title: "Ordinary Wizarding Levels study guide",
              author: "BathBabb",
              date: new Date("2017-04-14T15:30:00.000Z")
            }
          ]
    }
}
export default userController;
// module.exports = new userController();