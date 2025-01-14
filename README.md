If you want to clone this app for yourself, edit:

# Firebase rules:

```
service cloud.firestore {
match /databases/{database}/documents {

    // Rule for posts/{postId}
    match /posts/{postId} {
      // Only the admin can write; everyone can read
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'ADMIN1234';
    }

    // Rule for comments/{postId}/comments/{commentId}
    match /comments/{postId}/comments/{commentId} {
      // Everyone can read and write
      allow read: if true;
      allow create: if request.auth != null && validateComment(request.resource.data);
      allow update: if request.auth != null && request.auth.uid == resource.data.userId && validateComment(request.resource.data);
      allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

}
}


// Function to validate the comment object
function validateComment(data) {
return data.size() == 6
&& data.author is string
&& data.avatar is string
&& data.content is string && data.content.size() <= 500
&& data.datetime is timestamp
&& data.id is string
&& data.userId is string;
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
