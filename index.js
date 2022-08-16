let encryptionRule = {
    'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
    'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
    'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
    'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
    'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
    'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
    'Y': 'L', 'Z': 'M',
    'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
    'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
    'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
    'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
    'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
    'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
    'y': 'l', 'z': 'm',
    '0': '5', '1': '6', '2': '7', '3': '8',
    '4': '9', '5': '0', '6': '1', '7': '2',
    '8': '3', '9': '4',
    '!': '#', '$': '%', '&': '+', '-': '@',
    '_': '~', '#': '!', '%': '$', '+': '&',
    '@': '-', '~': '_'
}

const encrypt=(inputPassword)=>{
    let encryptedPassword=''
    for(char of inputPassword){
        encryptedPassword=encryptedPassword+encryptionRule[char]
    }
    return encryptedPassword
}


const decrypt = (encryptedPassword) => {
	let actualPassword = ''
	let keys = Object.keys(encryptionRule)
	let values = Object.values(encryptionRule)
	for(char of encryptedPassword) {
		let requiredIndex = values.findIndex(value => value === char)
		actualPassword = actualPassword + keys[requiredIndex]
	}
	return actualPassword
}



const DB_USERS=[]

const resetSignFields=()=>{
    document.getElementById('signup-first-name').value=''
    document.getElementById('signup-last-name').value=''
    document.getElementById('signup-email').value=''
    document.getElementById('signup-phone').value=''
    document.getElementById('signup-password').value=''
    document.getElementById('signup-confirm-password').value=''

}

const resetLoginFields=()=>{
    document.getElementById('login-email').value=''
    document.getElementById('login-password').value=''
   

}

const signup=()=>{
    let firstName=document.getElementById('signup-first-name').value
    let lastName=document.getElementById('signup-last-name').value
    let email=document.getElementById('signup-email').value
    let phone=document.getElementById('signup-phone').value
    let password=document.getElementById('signup-password').value
    let Conpassword=document.getElementById('signup-confirm-password').value
let signSuccessAlert= document.getElementById('signup-alert-success')
// let signFailureAlert= document.getElementById('signup-alert-failure')==validation failure
    let userDetails={
        firstName,
        lastName,
        email,
        phone,
        password:encrypt(password)
    }
    DB_USERS.push(userDetails)
    signSuccessAlert.style.display='block'
   resetSignFields()
}

const login=()=>{
    let EnteredEmail=document.getElementById('login-email').value
    let EnteredPassword=document.getElementById('login-password').value
    let loginSuccess=document.getElementById('login-alert-success')
    let loginFailure=document.getElementById('login-alert-failure')
    let currentUser=DB_USERS.find((user)=>{
    return user.email === EnteredEmail && decrypt(user.password) === EnteredPassword
  })

   
   if(currentUser){
loginSuccess.style.display='block'
loginFailure.style.display='none'
   }else{
 loginFailure.style.display='block'
 loginSuccess.style.display='none'    
   }
    resetLoginFields()
    
}

/*
find()==> Return a condtion to find the element. if value exists, return the value; else, return undefined.
    2.steps:
    1) Check whether the email (user) exits in the DB.
    2)whether enterted password matches with saved password for that user.
    */