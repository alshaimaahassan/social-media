let commentsContainer = document.getElementById("commentsContainer")
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let chickLogAlert = document.getElementById("chickLogAlert")
//let threeDots = ``
//let isMyPost = false;
getPost()
// let getCurrentUser = function () {
//     let user = null;
//     const storageUser = localStorage.getItem("user");
//     if (storageUser != null) {
//         user = JSON.parse(storageUser);
//     }
//     return user;
// }

const user = getCurrentUser()


function getPost() {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then(response => {
            const post = response.data.data;
            const comments = post.comments
            console.log(post)

            if (user && user.id && post && post.author && post.author.id) {
                isMyPost = user.id == post.author.id;
            }
            if (isMyPost) {
                threeDots = `
            <div onclick="handlePostList()" class="bg-gray-100 	rounded-full h-3.5 flex	items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="34px" fill="#92929D">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
</div>
<div  id="postList" class="hidden absolute top-20 right-96 w-40 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <a onclick = "editPostCard('${encodeURIComponent(JSON.stringify(post))}')" href="#" class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                Edit 
            </a>
            <a href="#" onclick ="deletePostCard()" class="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                Delete
            </a>
        </div>
`
            } else {
                threeDots = ''
            }
            commentsContainer.innerHTML = comments.map(comment =>
                `
            <div class="bg-white w-full max-w-5xl shadow p-6 flex space-x-4 rounded-lg">
                        <!-- صورة المستخدم -->
                        <div class="flex-shrink-0">
                            <img src="${comment.author.profile_image || 'https://via.placeholder.com/50'}" 
                            alt="User Image" 
                            class="h-12 w-12 object-cover rounded-full">
                        </div>
                        <!-- محتوى الكومنت -->
                        <div class="flex flex-col space-y-2 w-full">
                            <div class="text-gray-800 font-medium">
                                ${comment.author.name || 'Anonymous'}
                            </div>
                            <div class="text-sm text-gray-700 break-words">
                                ${comment.body}
                            </div>
                            <!-- الروابط -->
                            <div class="flex space-x-4 text-xs text-gray-500">
                                <a href="#" class="hover:underline">Like</a>
                                <span>.</span>
                                <a href="#" class="hover:underline">Reply</a>
                                <span>.</span>
                                <span>15 hours ago</span>
                            </div>
                        </div>
                    </div>`)
            document.getElementById('focusPost').innerHTML =


                `<div id=${post.id}  class="border bg-white mt-6 rounded-2xl p-4 w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-screen-md">

    <div class="flex items-center	justify-between">
        <div class="gap-3.5	flex items-center ">
            <img src=${post.author.profile_image} class="object-cover bg-yellow-500 rounded-full w-10 h-10" />
            <div class="flex flex-col">
                <b class="mb-2 capitalize">${post.author.username}</b>
                <time datetime="06-08-21" class="text-gray-400 text-xs">${post.created_at}
                </time>
            </div>
        </div>

        ${threeDots}

        
    </div>
    <div id="postBody" class="whitespace-pre-wrap mt-7">${post.body}</div>
    <div  class="mt-5 flex gap-2	 justify-center border-b pb-4 flex-wrap	">
    <img src="${post.image}" class="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto" alt="photo">
    </div>
        <div class=" h-16 border-b  flex items-center justify-around	">
            <div class="flex items-center	gap-3	">
                <svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="?-Social-Media" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Square_Timeline" transform="translate(-312.000000, -746.000000)">
                            <g id="Post-1" transform="translate(280.000000, 227.000000)">
                                <g id="Post-Action" transform="translate(0.000000, 495.000000)">
                                    <g transform="translate(30.000000, 21.000000)" id="Comment">
                                        <g>
                                            <g id="ic_comment-Component/icon/ic_comment">
                                                <g id="Comments">
                                                    <polygon id="Path" points="0 0 24 0 24 25 0 25"></polygon>
                                                    <g id="iconspace_Chat-3_25px"
                                                        transform="translate(2.000000, 3.000000)" fill="#92929D">
                                                        <path
                                                            d="M10.5139395,15.2840977 L6.06545155,18.6848361 C5.05870104,19.4544672 3.61004168,18.735539 3.60795568,17.4701239 L3.60413773,15.1540669 C1.53288019,14.6559967 0,12.7858138 0,10.5640427 L0,4.72005508 C0,2.11409332 2.10603901,0 4.70588235,0 L15.2941176,0 C17.893961,0 20,2.11409332 20,4.72005508 L20,10.5640427 C20,13.1700044 17.893961,15.2840977 15.2941176,15.2840977 L10.5139395,15.2840977 Z M5.60638935,16.5183044 L9.56815664,13.4896497 C9.74255213,13.3563295 9.955971,13.2840977 10.1754888,13.2840977 L15.2941176,13.2840977 C16.7876789,13.2840977 18,12.0671403 18,10.5640427 L18,4.72005508 C18,3.21695746 16.7876789,2 15.2941176,2 L4.70588235,2 C3.21232108,2 2,3.21695746 2,4.72005508 L2,10.5640427 C2,12.0388485 3.1690612,13.2429664 4.6301335,13.28306 C5.17089106,13.297899 5.60180952,13.7400748 5.60270128,14.2810352 L5.60638935,16.5183044 Z"
                                                            id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <div class="text-sm	">${post.comments_count} Comments</div>
            </div>
            <div class="flex items-center	gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd" />
                </svg>
                <div class="text-sm">5 Likes</div>
            </div>
            <div class="flex items-center	gap-3">
                <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="?-Social-Media" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Square_Timeline" transform="translate(-636.000000, -745.000000)">
                            <g id="Post-1" transform="translate(280.000000, 227.000000)">
                                <g id="Post-Action" transform="translate(0.000000, 495.000000)">
                                    <g transform="translate(30.000000, 21.000000)" id="Share">
                                        <g transform="translate(325.000000, 1.000000)">
                                            <g id="ic_Share-Component/icon/ic_Share">
                                                <g id="Share">
                                                    <circle id="Oval" cx="12" cy="12" r="12"></circle>
                                                    <g id="Group-24-Copy"
                                                        transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) translate(1.000000, 1.000000)"
                                                        fill="#92929D">
                                                        <path
                                                            d="M4,0 C6.209139,0 8,1.790861 8,4 C8,4.1291298 7.99388117,4.25683047 7.98191762,4.38282788 L15.371607,7.98470389 C16.0745405,7.37145444 16.9938914,7 18,7 C20.209139,7 22,8.790861 22,11 C22,13.209139 20.209139,15 18,15 C16.9572434,15 16.0076801,14.6009919 15.2956607,13.9473263 L7.98384745,17.6380767 C7.99453877,17.7572882 8,17.8780063 8,18 C8,20.209139 6.209139,22 4,22 C1.790861,22 0,20.209139 0,18 C0,15.790861 1.790861,14 4,14 C5.37147453,14 6.58173814,14.690226 7.30236849,15.7422555 L14.2017356,12.2577203 C14.0708451,11.8622268 14,11.4393868 14,11 C14,10.5276126 14.0818865,10.0743509 14.2322392,9.65363512 L7.29274641,6.27172794 C6.57099412,7.31588608 5.36538874,8 4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 Z M4,16 C2.8954305,16 2,16.8954305 2,18 C2,19.1045695 2.8954305,20 4,20 C5.1045695,20 6,19.1045695 6,18 C6,16.8954305 5.1045695,16 4,16 Z M18,9 C16.8954305,9 16,9.8954305 16,11 C16,12.1045695 16.8954305,13 18,13 C19.1045695,13 20,12.1045695 20,11 C20,9.8954305 19.1045695,9 18,9 Z M4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 Z"
                                                            id="Combined-Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <div class="text-sm">Share</div>
            </div>
            <div class="flex items-center	gap-3">
                <svg width="17px" height="22px" viewBox="0 0 17 22" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="?-Social-Media" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Square_Timeline" transform="translate(-787.000000, -745.000000)">
                            <g id="Post-1" transform="translate(280.000000, 227.000000)">
                                <g id="Post-Action" transform="translate(0.000000, 495.000000)">
                                    <g transform="translate(30.000000, 21.000000)" id="Saved">
                                        <g transform="translate(473.000000, 1.000000)">
                                            <g id="ic_Saved-Component/icon/ic_Saved">
                                                <g id="Saved">
                                                    <circle id="Oval" cx="12" cy="12" r="12"></circle>
                                                    <g id="Group-13-Copy" transform="translate(5.000000, 2.000000)"
                                                        fill="#92929D">
                                                        <path
                                                            d="M2.85714286,-0.952380952 L12.1428571,-0.952380952 C14.246799,-0.952380952 15.952381,0.753200953 15.952381,2.85714286 L15.952381,18.2119141 C15.952381,19.263885 15.09959,20.116746 14.047619,20.116746 C13.6150601,20.116746 13.1953831,19.9694461 12.8576286,19.6992071 L7.5,15.4125421 L2.14237143,19.6992071 C1.32096217,20.3564207 0.122301512,20.2233138 -0.534912082,19.4019046 C-0.805151112,19.0641501 -0.952380952,18.644473 -0.952380952,18.2119141 L-0.952380952,2.85714286 C-0.952380952,0.753200953 0.753200953,-0.952380952 2.85714286,-0.952380952 Z M2.85714286,0.952380952 C1.80517191,0.952380952 0.952380952,1.80517191 0.952380952,2.85714286 L0.952380952,18.2119141 L6.31000952,13.9252491 C7.00569973,13.3686239 7.99430027,13.3686239 8.68999048,13.9252491 L14.047619,18.2119141 L14.047619,2.85714286 C14.047619,1.80517191 13.1948281,0.952380952 12.1428571,0.952380952 L2.85714286,0.952380952 Z"
                                                            id="Rectangle-92"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <div class="text-sm">Saved</div>
            </div>
        </div>
        <div id="comBox" class="flex items-center justify-between mt-4">
        <!-- صورة المستخدم -->

        <img 
            id="comImg" 
            class="bg-yellow-500 rounded-full w-10 h-10 object-cover border" 
            src=${user.profile_image}
            alt="User Image" 
        />
        <!-- صندوق الإدخال -->
        <div class="flex items-center justify-between bg-gray-50 h-11 w-11/12 border rounded-2xl overflow-hidden px-4">
            <input 
            
            id ="newComment"
                type="text" 
                class="h-full w-full bg-gray-50 outline-none" 
                placeholder="Write your comment..." 
                name="comment" 
            />
            <svg id="sendComment" onclick="postComment()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
<svg aria-hidden="true" id="commentLoader" role="status" class="hidden inline w-4 h-4 me-3 text-gray-600 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
        </div>
    </div>`

        })
}




//let token = localStorage.getItem('token'); // جلب الـ token من التخزين المحلي
function postComment() {
    let newComment = document.getElementById('newComment').value;
    document.getElementById("commentLoader").style.display = "block";
    document.getElementById('sendComment').style.display = "none";
    if (token == null) {
        chickLogAlert.style.display = 'block';
        setTimeout(() => {
            chickLogAlert.style.display = 'none';
        }, 2000);

    }else if(newComment == ""){
        document.getElementById("commentLoader").style.display = "none";
        document.getElementById('sendComment').style.display = "block";
        return

    } else {
        let params = {
            "body": newComment
        }
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
            params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    getPost()
                    document.getElementById("commentLoader").style.display = "none";
    document.getElementById('sendComment').style.display = "block";
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}
//let editPostModal = document.getElementById("editPostModal")
//let postEditDescription = document.getElementById("postEditDescription")

// let handlePostList = () => {
//     let postList = document.getElementById("postList");
//     postList.classList.toggle("hidden");
// }
// let editPostCard = function (postObject) {
//     let post = JSON.parse(decodeURIComponent(postObject))
//     postEditDescription.value = post.body
//     console.log(post.body);

//     // Open Modal

//     editPostModal.classList.remove('hidden');
//     // Close Modal
//     closePostEditModal.addEventListener('click', () => {
//         editPostModal.classList.add('hidden');
//     });

//     // Close Modal on Outside Click
//     window.addEventListener('click', (e) => {
//         if (e.target === editPostModal) {
//             editPostModal.classList.add('hidden');
//         }
//     });
// };


// let editPost = function (e) {

//     e.preventDefault();

//     let postBody = document.getElementById('postBody').innerText;
//     let params = {
//         "body": postEditDescription.value
//     }
//     axios.put(`https://tarmeezacademy.com/api/v1/posts/${id}`, params, {
//         headers: {
//             Authorization: `Bearer ${token}`,

//         }
//     })
//         .then(response => {
//             if (response.status === 200) {
//                 getPost()
//                 editPostModal.classList.add('hidden');
//                 alert("Post updated successfully!");

//             }
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }


//editpostForm.addEventListener('submit', editPost)