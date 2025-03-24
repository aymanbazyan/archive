This is a personal project of a blogs archive, where i can save any long notes i don't want to lose

I post using another website like an admin dashboard:

![image](https://github.com/user-attachments/assets/3808449c-88f6-4f15-a93c-a2847e5b9981)

![image](https://github.com/user-attachments/assets/a405c2aa-f546-4835-a185-bc7b43684e30)



If you want to clone this app for yourself, remember to edit these:

# Firebase rules:

```
service cloud.firestore {
  match /databases/{database}/documents {
  
    // Rule for posts/{postId}
    match /posts/{postId} {
      // Only the admin can write; everyone can read
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'ADMIN_UID1234';
    }

    // Rule for comments/{postId}/comments/{commentId}
    match /comments/{postId}/comments/{commentId} {
      // Everyone can read and write comments with proper validation
      allow read: if true;
      allow create: if request.auth != null 
        && validateComment(request.resource.data)
        && request.resource.data.author == request.auth.token.email.split('@')[0]
        && request.resource.data.avatar == request.auth.token.picture
        && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null 
        && request.auth.uid == resource.data.userId 
        && validateComment(request.resource.data)
        && request.resource.data.author == request.auth.token.email.split('@')[0]
        && request.resource.data.avatar == request.auth.token.picture
        && request.resource.data.userId == request.auth.uid;
      allow delete: if request.auth != null && (request.auth.uid == resource.data.userId || request.auth.uid == 'ADMIN_UID1234');
    }
    
     match /notifyAdmin/{postId} {
      // Only the admin can write; everyone can read
      allow read: if request.auth.uid == 'ADMIN_UID1234'
      allow write: if request.auth != null;
    }
  }
}

// Function to validate the comment object
function validateComment(data) {
  return data.author is string
    && data.author.size() > 0 && data.author.size() <= 100
    && data.avatar is string
    && data.avatar.size() > 0 && data.avatar.size() <= 200
    && data.content is string
    && data.content.size() > 0 && data.content.size() <= 500
    && data.datetime is timestamp
    && data.id is string
    && data.id.size() > 0 && data.id.size() <= 50
    && data.userId is string
    && data.userId.size() > 0 && data.userId.size() <= 50;
}


```

- EDIT THE ADMIN_UID_1234

- You can also edit the comment size here, but remember to also edit it in src/helpers/config.js

# Enviorment:

VITE_API_KEY=AAAAAAA

VITE_AUTH_DOMAIN=AAAAAAA

VITE_PROJECT_ID=AAAAAAA

VITE_STORAGE_BUCKET=AAAAAAA

VITE_MESSAGING_SENDER_ID=AAAAAAA

VITE_APP_ID=AAAAAAA
