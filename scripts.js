
const token = localStorage.getItem("token");
let editPostModal = document.getElementById("editPostModal")
let postEditDescription = document.getElementById("postEditDescription")
let editPostForm = document.getElementById("editPostForm")
let threeDots = ``
let isMyPost = false;

// Setup function
let setUp = function () {
	if (token == null) {
		loginButton.style.display = "block";
		registerButton.style.display = "block";
		logoutButton.style.display = "none";
		createPostBtn.style.display = "none";
		document.getElementById("avatar").style.display = "none";


	} else {
		loginButton.style.display = "none";
		registerButton.style.display = "none";
		logoutButton.style.display = "block";
		createPostBtn.style.display = "block"


		document.getElementById("avatar").style.display = "block";

		const user = getCurrentUser()
		avatarName.innerHTML = user.username
		avatarImg.src = user.profile_image

	}
};
function handelFocusing  (postId) {
	window.location = `postDetails.html?id=${postId}`
}
let getCurrentUser = function () {
	let user = null;
	const storageUser = localStorage.getItem("user");
	if (storageUser != null) {
		user = JSON.parse(storageUser);
	}
	return user;
}


// Logout function
let handelLogout = function () {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	setUp();
	logoutAlert.style.display = "block"
	setTimeout(() => {
		logoutAlert.style.display = "none"
	}, 3000);
};

// Elements
const loginButton = document.getElementById('loginButton');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const registerButton = document.getElementById('regBtn');
const logoutButton = document.getElementById('logoutButton');
const registerModal = document.getElementById('registerModal');
const loginAlert = document.getElementById('loginAlert');
const logoutAlert = document.getElementById('logoutAlert');
const createPostBtn = document.getElementById('createPostBtn');
const createPostModal = document.getElementById('createPostModal');
const closePostModal = document.getElementById('closePostModal');
const closePostEditModal =  document.getElementById('closePostEditModal');
const postForm = document.getElementById('postForm');
let avatarName = document.getElementById("avatarName");
let avatarImg = document.getElementById("avatarImg");

// Login modal handling
loginButton.addEventListener('click', () => {
	loginModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
	loginModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
	if (e.target === loginModal) {
		loginModal.classList.add('hidden');
	}
});

// Register modal handling
function openRegisterModal() {
	registerModal.classList.remove('hidden');
}

window.addEventListener('click', (e) => {
	if (e.target === registerModal) {
		registerModal.classList.add('hidden');
	}
});

// Login handler
let loginHandler = function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const params = {
		"username": username,
		"password": password
	};

	console.log('Username:', username);
	console.log('Password:', password);

	let url = "https://tarmeezacademy.com/api/v1/login";
	axios.post(url, params)
		.then((response) => {
			console.log(response.data);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			localStorage.setItem('token', response.data.token);
			loginModal.classList.add('hidden');
			console.log('token', response.data.token);

			loginAlert.style.display = "block"
			setTimeout(() => {
				loginAlert.style.display = "none"
			}, 2000);
			setUp()
		})
		.catch(error => {
			console.error('Error Response:', error.response);
			alert(error.response?.data?.message || "Login failed. Please check your credentials.");
		});
};

// Register handler
let registerHandler = function (event) {
	event.preventDefault();

	const name = document.getElementById('name').value;
	const userName = document.getElementById('userName').value;
	const password = document.getElementById('passWordR').value;
	const email = document.getElementById('email').value;
	const userImg = document.getElementById('userImg').files[0];
	console.log(userImg)
	let formData = new FormData()
	formData.append('name', name);
	formData.append('username', userName);
	formData.append('password', password);
	formData.append('email', email);
	formData.append('image', userImg);

	console.log('Username:', userName);

	let url = "https://tarmeezacademy.com/api/v1/register";
	axios.post(url, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})
		.then((response) => {
			console.log(response.data);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			localStorage.setItem('token', response.data.token);
			registerModal.classList.add('hidden');
			setUp();
			loginAlert.style.display = "block"
			setTimeout(() => {
				loginAlert.style.display = "none"
			}, 2000);
		})
		.catch(error => {
			console.error('Error Response:', error.response);
			alert(error.response?.data?.message || "Registration failed. Please try again.");
		});
};

let handelCreatePost = function () {
	// Open Modal
	createPostModal.classList.remove('hidden');
	// Close Modal
	closePostModal.addEventListener('click', () => {
		createPostModal.classList.add('hidden');
	});

	// Close Modal on Outside Click
	window.addEventListener('click', (e) => {
		if (e.target === createPostModal) {
			createPostModal.classList.add('hidden');
		}
	});

	// Handle Post Submission
	postForm.addEventListener('submit', async (e) => {
			console.log(e);
		e.preventDefault();

		const description = document.getElementById('postDescription').value;
		const imageFile = document.getElementById('postImage').files[0];
		let formData = new FormData();

		formData.append("body", description);
		formData.append("image", imageFile);

		try {
			const token = localStorage.getItem("token");
			const url = "https://tarmeezacademy.com/api/v1/posts";
			const response = await axios.post(url, formData, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "multipart/form-data"
				}
			});

			console.log(response.data);
			alert("Post created successfully!");
			createPostModal.classList.add('hidden');
			postForm.reset();
			getPosts();
		} catch (error) {
			console.error("Error:", error.response?.data?.message || "Failed to create post");
			alert(error.response?.data?.message || "Failed to create post");
		}
	});
}
let handlePostList = () => {
    let postList = document.getElementById("postList");
    postList.classList.toggle("hidden");
	console.log(postList)
}
let editPostCard = function (postObject) {
    let post = JSON.parse(decodeURIComponent(postObject))
	let postId = post.id
	console.log(postId)
		postEditDescription.value = post.body
    console.log(post.body);

    // Open Modal

    editPostModal.classList.remove('hidden');
    // Close Modal
    closePostEditModal.addEventListener('click', () => {
        editPostModal.classList.add('hidden');
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === editPostModal) {
            editPostModal.classList.add('hidden');
        }
    });
};

let editPostCardOut = function (post) {
	
console.log(post);
		postEditDescription.value = post.body
    console.log(post.body);

    // Open Modal

    editPostModal.classList.remove('hidden');
    // Close Modal
    closePostEditModal.addEventListener('click', () => {
        editPostModal.classList.add('hidden');
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === editPostModal) {
            editPostModal.classList.add('hidden');
        }
    });
};






let editPost = function (e) {

    e.preventDefault();

    let postBody = document.getElementById('postBody').innerText;
    let params = {
        "body": postEditDescription.value
    }
    axios.put(`https://tarmeezacademy.com/api/v1/posts/${id}`, params, {
        headers: {
            Authorization: `Bearer ${token}`,

        }
    })
        .then(response => {
            if (response.status === 200) {
                getPost()
                editPostModal.classList.add('hidden');
                alert("Post updated successfully!");

            }
        })
        .catch(error => {
            console.error(error);
        });
}

//editPostForm.addEventListener('submit', editPost)

let deletePostCard = function (){
    // Open Modal
    console.log('Modal')
    deletePostModal.classList.remove('hidden');
    // Close Modal
    closePostDeleteModal.addEventListener('click', () => {
        deletePostModal.classList.add('hidden');
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === deletePostModal) {
            deletePostModal.classList.add('hidden');
        }
    });
 }
let deletePostBtn = document.getElementById("deletePostBtn")

deletePostBtn.addEventListener('click', function(e) {
    e.preventDefault();
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(response => {
        alert('post deleted successfully')
		window.location = `index.html`

        getPost()
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
});


setUp()