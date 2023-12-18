import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {set,get,getDatabase,ref, remove} from 'firebase/database';
import {v4 as uuid} from 'uuid'

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     databaseURL: process.env.REACT_APP_FIREBASE_DB_URL
// } 

const firebaseConfig = {
    
    apiKey: "AIzaSyC8K5TI5zz15rz10WtSATRByvmS__H7FO4",
    authDomain: "my-shop-54f5b.firebaseapp.com",
    databaseURL: "https://my-shop-54f5b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-shop-54f5b",
    storageBucket: "my-shop-54f5b.appspot.com",
    messagingSenderId: "909327449473",
    appId: "1:909327449473:web:3a763f1ba4dbacaf637c80",
    measurementId: "G-TK0HJM8HQV"
  };

/* 
process.env = 환경변수 node.js에 전역객체
환경변수 : 실행중인 프로세스에 사용할 수 있고, 애플리케이션을 구현하는 키-값으로 이루어진 변수
외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 않고 설정, 개인정보 매개변수로
분리해서 관리하는 용도로 사용
process = 현재 node.js의 프로세스의 전역객체로 실행중인 프로세스에 접근해서 정보를 받아옴
.env = process에서 사용할 수 있는 모든 환경변수를 포함하는 객체
*/

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);


//자동로그인 방지
provider.setCustomParameters({
    prompt : 'select_account'
})
//구글 로그인 function
export async function googleLogin(){
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user)
        return user;
    }catch(error){
        console.error(error)
    }
}

export async function googleLogOut(){
    try{
        await signOut(auth); //기존의 정보를 초기화하는 hook
    }catch(error){
        console.error(error);
    }
}

//로그인시 새로고침해도 로그인을 계속 유지
export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=>{
        if(user){
            try{
                ///callback(user)
                const updateUser = await adminUser(user)
                callback(updateUser)
            }catch(error){
                console.error(error);
            }
        }else{
            callback(null)
        }
    })
    //onAuthStateChanged = 사용자 인증 상태에 변화를 체크하는 hook
}

async function adminUser(user){
    try{
        const snapshot = await get(ref(database, 'admin'));
        //snapshot = firebase안에 database안에 admin폴더를 검색
        if(snapshot.exists()){
            // snapshot.exists() = snapshot안에 데이터가 있음을 의미
            const admins = snapshot.val(); //admin폴더안에 있는 데이터들을 검색
            const isAdmin = admins.includes(user.email);
            //검색된 admins에 현재 로그인된 사용자의 이메일과 일치하는 이메일이 있는지 확인
            return {...user, isAdmin}
        }
        return user
    }catch(error){
        console.error(error)
    }
}
//상품을 database에 업로드
export async function addProducts(product, image){
    //uuid = 식별자를 만들어주는 라이브러리
    //숫자와 영문으로 조합된 식별자 코드를 부여해서 사용하는 라이브러리
    const id = uuid()
    console.log(id)
    return set(ref(database, `products/${id}`),{
        ...product,
        id,
        image,
    })
}

//database에 있는 상품을 가져오기

export async function getProducts(){
    /* 
    async = 비동기 방식의 데이터 처리 방법(promise의 단점을 보완한 최신 비동기처리방식 코드)

    */
   const snapshot = await get(ref(database, 'products'));
   if(snapshot.exists()){
    return Object.values(snapshot.val())
   }else{
    return []
   }
}
//장바구니 리스트(업데이트, 상품정보 가져오기, 상품 삭제)
//장바구니 리스트 불러오기
export async function getCart(userId){
    try{
        const snapshot = await(get(ref(database, `cart/${userId}`)));
        if(snapshot.exists()){
            const item = snapshot.val();
            return Object.values(item);
        }else{
            return[]
        }
    }catch(error){
        console.error(error)
    }
}
//장바구니 업데이트
export async function updateCart(userId, product){
    try{
        const cartRef = ref(database, `cart/${userId}/${product.id}`);
        await set(cartRef, product);
    }catch(error){
        console.error(error)
    }
}

//장바구니 목록 삭제
export async function deleteCart(userId, productId){
   return remove(ref(database, `cart/${userId}/${productId}`))
}

//카테고리 상품 가져오기
export async function getCategoryProduct(category){
    return get(ref(database, 'products')).then((snapshot)=>{
        if(snapshot.exists()){

            const allProducts = Object.values(snapshot.val());
            const filterProducts = allProducts.filter((product)=>product.category === category);
            return filterProducts
        }
        return[];
    })
}

//상품 검색
export async function searchProducts(query){
    try{
        const dbRef = ref(database, 'products');
        const snapshot = await get(dbRef);
        if(snapshot.exists()){
            const data = snapshot.val();
            const allProducts = Object.values(data);

            if(allProducts.length === 0){
                return []
            }
            const matchProducts = allProducts.filter((product)=>{
                const itemTitle = product.title;
                return itemTitle.includes(query)
            })

            return matchProducts
        }else{
            return[]
        }
        
    }catch(error){

    }
}

//데이터베이스에 게시글 업로드
export async function addBoard(user, date, title, text){
    const id = uuid();
    const postData = {
        id,
        user,
        date,
        title,
        text
    }
    return set(ref(database, `/board/${id}`), postData)
}

//등록된 게시글 가져오기
export async function getBoard(){
    return get(ref(database, 'board'))
    .then((snapshot)=>{
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        } //데이터가 있으면
        return[]
    })
}