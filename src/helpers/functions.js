const arabicHebrewRegex = /[\u0600-\u06FF\u0590-\u05FF]/;
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
const symbolRejex = /[a-zA-Z\u0600-\u06FF\u0750-\u077F\u0590-\u05FF]/;

function isTextStartsWithArabic(text) {
  if (typeof text !== "string" || !text) return;
  const newText = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Convert arabic numbers to english
  const a2eText = a2e(newText);

  // Get first NaN
  let firstNaN;
  a2eText.split("").map((letter) => {
    if (firstNaN) return;

    if (isNaN(letter) && symbolRejex.test(letter)) {
      firstNaN = letter;
      return;
    }
  });

  // Check if the first character in the text is Arabic
  return arabicHebrewRegex.test(firstNaN);
}

function saveToLocal(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function getFromLocal(key) {
  const item = localStorage.getItem(key);
  if (item == "undefined") return null;
  const parsed = JSON.parse(item);
  return parsed;
}

function toggleSave(id, setIsBookmarked) {
  const bookmarks = getFromLocal("bookmarks");

  if (!bookmarks) {
    const newBookMarks = [];
    newBookMarks.push(id);

    saveToLocal("bookmarks", newBookMarks);
    setIsBookmarked(true);
    return;
  }

  if (getFromLocal("bookmarks")?.some((i) => i == id)) {
    const filtrd = bookmarks.filter((i) => i !== id);
    saveToLocal("bookmarks", filtrd);
    setIsBookmarked(false);
  } else {
    bookmarks.push(id);

    saveToLocal("bookmarks", bookmarks);
    setIsBookmarked(true);
  }
}

// const formatDateTime = (date) => {
//   if (!date) return;
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
// };

/**
 * Extracts content from a document while converting links and images to text representation
 * without modifying the original DOM.
 * @param {HTMLElement} doc - The document or element to extract content from
 * @return {string} The extracted text content
 */
const getElementContent = (doc) => {
  if (!doc) return "";

  // Create a clone of the document to avoid modifying the original
  const clone = doc.cloneNode(true);

  // Process links
  const links = clone.querySelectorAll("a");
  links.forEach((link) => {
    const newElement = document.createElement("span");
    newElement.textContent = `${link.textContent} [${link.href}] `; // Add space after link
    link.replaceWith(newElement);
  });

  // Process images
  const imgs = clone.querySelectorAll("img");
  imgs.forEach((img) => {
    const newElement = document.createElement("span");
    newElement.textContent = `(${img.alt || "File preview"}) [${
      img.src.startsWith("data:") ? "Link unavailable" : img.src
    }] `; // Add space after image
    img.replaceWith(newElement);
  });

  // Process empty paragraphs
  const spaces = clone.querySelectorAll("p");
  spaces.forEach((space) => {
    if (space.textContent === " ") {
      const newElement = document.createElement("p");
      newElement.textContent = "\n";
      space.replaceWith(newElement);
    }
  });

  // Process horizontal rules
  const hrs = clone.querySelectorAll("hr");
  hrs.forEach((hr) => {
    const newElement = document.createElement("p");
    newElement.textContent = "---------\n"; // Add newline after horizontal rule
    hr.replaceWith(newElement);
  });

  // Add explicit paragraph breaks and ensure proper spacing between block elements
  const blockElements = [
    "p",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "blockquote",
    "pre",
  ];

  blockElements.forEach((tag) => {
    const elements = clone.querySelectorAll(tag);
    elements.forEach((el) => {
      // Add explicit newlines after block elements
      const spacer = document.createElement("div");
      spacer.style.marginBottom = "1em"; // Create visual space
      spacer.innerHTML = "\n\n"; // Explicit newlines
      el.after(spacer);
    });
  });

  // Special handling for list items to maintain hierarchy
  const listItems = clone.querySelectorAll("li");
  listItems.forEach((li) => {
    const spacer = document.createElement("span");
    spacer.innerHTML = "\n";
    li.appendChild(spacer);
  });

  // Convert the modified clone to HTML and then to text
  // This approach preserves more whitespace than innerText alone
  const tempDiv = document.createElement("div");
  tempDiv.appendChild(clone);

  // First get the text with HTML whitespace preserved
  let result = tempDiv.innerHTML;

  // Convert the HTML to plain text while preserving line breaks
  result = result.replace(/<br\s*\/?>/gi, "\n");
  result = result.replace(/<\/p>/gi, "\n\n");
  result = result.replace(/<\/div>/gi, "\n");
  result = result.replace(/<\/h[1-6]>/gi, "\n\n");
  result = result.replace(/<\/li>/gi, "\n");
  result = result.replace(/<\/blockquote>/gi, "\n\n");
  result = result.replace(/<\/pre>/gi, "\n\n");

  // Remove all remaining HTML tags
  result = result.replace(/<[^>]*>/g, "");

  // Clean up whitespace
  result = result.replace(/&nbsp;/g, " ");
  result = result.replace(/\n{3,}/g, "\n\n"); // Limit to max two consecutive newlines
  result = result.trim();

  return result;
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export {
  isTextStartsWithArabic,
  toggleSave,
  getFromLocal,
  getElementContent,
  getCookie,
  deleteCookie,
  // formatDateTime
};
