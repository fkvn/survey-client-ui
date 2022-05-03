import axios from "axios";

const aliceObj = window.sessionStorage.getItem(
	"oidc.user:https://identity.cysun.org:alice-survey-service-spa"
);

const instance = axios.create({
	// baseURL: "http://ecst-csproj2.calstatela.edu:6328/api/"
	baseURL: "http://localhost:8080/api",
	// baseURL: "https://alice.cysun.org/surveys/api",
});

const responseHandler = (response) => {
	// if (response.status === 401) {
	//     window.location = '/login';
	// }

	return response;
};

const errorHandler = (error) => {
	return Promise.reject(error);

	// if (error.message === 'Network Error'|| error.response.status === 502) { //if didn't turn on the spring-boot server
	//               alert('Rubric Server is Down. Please come to visit the site later');
	//           }
	//           else if (error.response.status === 401) {
	//               console.log(error.message)
	//               alert("Sorry, your login is expired! Please login again.")
	//               window.location.replace(homepage);//go to homepage
	//               window.sessionStorage.removeItem("oidc.user:https://identity.cysun.org:alice-rubric-service-spa");
	//               window.sessionStorage.removeItem("canvasToken");
	//               window.location.reload(false);
	//           }
	//           else if (error.response.status === 403) {
	//               alert("Sorry, you are not authorized to do this action")
	//               window.location.replace(homepage);//go to homepage
	//           }
	//           else {
	//               alert("error status code: " + error.response.status);
	//               window.location.replace(homepage);//go to homepage
	//           }
};

if (aliceObj) {
	instance.defaults.headers.common["Authorization"] =
		"Bearer " + JSON.parse(aliceObj)["access_token"];
} else {
	instance.defaults.headers.common["Authorization"] = null;
}

instance.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export default instance;
