import axios from "axios";

export default {
  Model1: {
    getAll: function() {
      axios({
        url: "/api/model1",
        method: "GET"
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },

    getOne: function(id) {
      axios({
        url: `/api/model1/${id}`,
        method: "GET"
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },

    createOne: function(newModel1) {
      axios({
        url: "api/model1",
        method: "POST",
        data: newModel1
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },

    updateOne: function(id, updatedModel1) {
      axios({
        url: `/api/model1/${id}`,
        method: "PUT",
        data: updatedModel1
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },

    deleteOne: function(id) {
      axios({
        url: `/api/model1/${id}`,
        method: "DELETE"
      })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
  }
};
