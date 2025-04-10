import supabase from "./supabase";

const fakePosts = [
  {
    id: 1,
    author: "Ayman",
    titles: {
      ar: "عنوان عربي 1",
      en: "English Title 1",
    },
    bodies: {
      ar: "هذا نص طويل جداً باللّغة العربية، يحتوي على العديد من التفاصيل والمعلومات التي قد تكون غير ضرورية ولكنها موجودة فقط لجعل النص يبدو طويلاً جداً بحيث لا ينتهي بسهولة. يمكن أن تستمر في القراءة إلى ما لا نهاية وستظل تشعر أن النص مستمر بلا توقف.",
      en: "This is a very long English text that contains a lot of unnecessary details and information just to make it look extremely lengthy, making sure it doesn’t end easily. You can keep reading forever, and it will still feel like the text is never-ending.",
    },
  },
  {
    id: 2,
    author: "Liam",
    titles: {
      ar: "عنوان عربي 2",
      en: "English Title 2",
    },
    bodies: {
      ar: "هذا نص عربي طويل آخر يهدف إلى أن يكون ضخماً ويستهلك مساحة كبيرة فقط ليعطي الانطباع بأنّه طويل. لا يوجد شيء مهم هنا ولكنّك ستضطر لقراءة المزيد والمزيد دون أن ينتهي.",
      en: "This is another extremely long English text meant to be massive and take up a lot of space just to give the impression of being lengthy. There’s nothing important here, but you’ll have to keep reading more and more without it ending.",
    },
  },
  {
    id: 3,
    author: "Sophia",
    titles: {
      ar: "عنوان عربي 3",
      en: "English Title 3",
    },
    bodies: {
      ar: "النص يستمر ويستمر كما لو أنه لن ينتهي أبدًا، مكتوب فقط لجعله يبدو غير منتهٍ، ولا يحتوي على أي شيء جوهري ولكنه فقط موجود هنا ليكون طويلاً.",
      en: "The text keeps going and going as if it will never end, written only to make it look endless. It has nothing substantial, but it’s just here to be long.",
    },
  },
  {
    id: 4,
    author: "Noah",
    titles: {
      ar: "عنوان عربي 4",
      en: "English Title 4",
    },
    bodies: {
      ar: "هذا النص مجرد مثال آخر على كيفية جعل النصوص تبدو غير منتهية وطويلة بشكل مفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكمفرط، ولا يوجد أي فائدة فعلية من قراءته ولكنه سيظل ممتدًا هكذا.",
      en: "text hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is t hello man <h1 class='marker-green'>This</h1> text is just another example of how to make texts look excessively long and never-ending. There’s no actual benefit in reading it, but it will just keep going like this.",
    },
  },
  {
    id: 5,
    author: "Olivia",
    titles: {
      ar: "عنوان عربي 5",
      en: "English Title 5",
    },
    bodies: {
      ar: "هذا النص قد يبدو بلا نهاية، ولكنه في الواقع مجرد سلسلة من الكلمات العشوائية المصممة لجعل النص يبدو ضخماً بلا أي فائدة حقيقية.",
      en: "This text may seem endless, but in reality, it’s just a sequence of random words designed to make it look massive with no real benefit.",
    },
  },
  {
    id: 6,
    author: "Emma",
    titles: {
      ar: "عنوان عربي 6",
      en: "English Title 6",
    },
    bodies: {
      ar: "إن كنت قد وصلت إلى هذه النقطة، فربما تتساءل لماذا لا يزال هذا النص مستمرًا ولماذا هو طويل جدًا، حسنًا، الإجابة هي أنه لا يوجد سبب حقيقي سوى جعله يبدو أطول.",
      en: "If you’ve made it this far, you might be wondering why this text is still going and why it’s so long. Well, the answer is that there’s no real reason other than making it look longer.",
    },
  },
  {
    id: 7,
    author: "James",
    titles: {
      ar: "عنوان عربي 7",
      en: "English Title 7",
    },
    bodies: {
      ar: "أحيانًا يتم ملء النصوص بمحتوى طويل للغاية لا لشيء سوى لجعلها تبدو ضخمة، وهذا النص مثال حي على ذلك، فهو يستمر بلا هدف واضح.",
      en: "Sometimes, texts are filled with extremely long content just to make them look massive, and this text is a living example of that. It just goes on with no clear purpose.",
    },
  },
  {
    id: 8,
    author: "Benjamin",
    titles: {
      ar: "عنوان عربي 8",
      en: "English Title 8",
    },
    bodies: {
      ar: "من المدهش كيف يمكن للنصوص أن تصبح غير منتهية إذا تم تكرار بعض الأفكار مرارًا وتكرارًا، مما يجعل القارئ يشعر بأنه عالق في دائرة لا تنتهي.",
      en: "It’s amazing how texts can become endless if certain ideas are repeated over and over, making the reader feel like they’re stuck in a never-ending loop.",
    },
  },
  {
    id: 9,
    author: "Mia",
    titles: {
      ar: "عنوان عربي 9",
      en: "English Title 9",
    },
    bodies: {
      ar: "هل ما زلت تقرأ؟ لماذا؟ لا يوجد شيء مهم هنا، لكن لا يزال النص مستمرًا لجعله يبدو أطول وأكثر تعقيدًا مما يجب.",
      en: "Are you still reading? Why? There’s nothing important here, but the text still continues just to make it look longer and more complex than it needs to be.",
    },
  },
  {
    id: 10,
    author: "Ethan",
    titles: {
      ar: "عنوان عربي 10",
      en: "English Title 10",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 11,
    author: "Olivia",
    titles: {
      ar: "عنوان عربي 11",
      en: "English Title 11",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 12,
    author: "Noah",
    titles: {
      ar: "عنوان عربي 12",
      en: "English Title 12",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 13,
    author: "Isabella",
    titles: {
      ar: "عنوان عربي 13",
      en: "English Title 13",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 14,
    author: "Liam",
    titles: {
      ar: "عنوان عربي 14",
      en: "English Title 14",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 15,
    author: "Sophia",
    titles: {
      ar: "عنوان عربي 15",
      en: "English Title 15",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 16,
    author: "Mason",
    titles: {
      ar: "عنوان عربي 16",
      en: "English Title 16",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 17,
    author: "Ava",
    titles: {
      ar: "عنوان عربي 17",
      en: "English Title 17",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 18,
    author: "William",
    titles: {
      ar: "عنوان عربي 18",
      en: "English Title 18",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 19,
    author: "Mia",
    titles: {
      ar: "عنوان عربي 19",
      en: "English Title 19",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 20,
    author: "James",
    titles: {
      ar: "عنوان عربي 20",
      en: "English Title 20",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 21,
    author: "Charlotte",
    titles: {
      ar: "عنوان عربي 21",
      en: "English Title 21",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 22,
    author: "Benjamin",
    titles: {
      ar: "عنوان عربي 22",
      en: "English Title 22",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 23,
    author: "Amelia",
    titles: {
      ar: "عنوان عربي 23",
      en: "English Title 23",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 24,
    author: "Elijah",
    titles: {
      ar: "عنوان عربي 24",
      en: "English Title 24",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 25,
    author: "Harper",
    titles: {
      ar: "عنوان عربي 25",
      en: "English Title 25",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 26,
    author: "Oliver",
    titles: {
      ar: "عنوان عربي 26",
      en: "English Title 26",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 27,
    author: "Evelyn",
    titles: {
      ar: "عنوان عربي 27",
      en: "English Title 27",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 28,
    author: "Henry",
    titles: {
      ar: "عنوان عربي 28",
      en: "English Title 28",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 29,
    author: "Abigail",
    titles: {
      ar: "عنوان عربي 29",
      en: "English Title 29",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 30,
    author: "Alexander",
    titles: {
      ar: "عنوان عربي 30",
      en: "English Title 30",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 31,
    author: "Scarlett",
    titles: {
      ar: "عنوان عربي 31",
      en: "English Title 31",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 32,
    author: "Daniel",
    titles: {
      ar: "عنوان عربي 32",
      en: "English Title 32",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 33,
    author: "Victoria",
    titles: {
      ar: "عنوان عربي 33",
      en: "English Title 33",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 34,
    author: "Matthew",
    titles: {
      ar: "عنوان عربي 34",
      en: "English Title 34",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 35,
    author: "Madison",
    titles: {
      ar: "عنوان عربي 35",
      en: "English Title 35",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 36,
    author: "Joseph",
    titles: {
      ar: "عنوان عربي 36",
      en: "English Title 36",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 37,
    author: "Emily",
    titles: {
      ar: "عنوان عربي 37",
      en: "English Title 37",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 38,
    author: "David",
    titles: {
      ar: "عنوان عربي 38",
      en: "English Title 38",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 39,
    author: "Chloe",
    titles: {
      ar: "عنوان عربي 39",
      en: "English Title 39",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 40,
    author: "Andrew",
    titles: {
      ar: "عنوان عربي 40",
      en: "English Title 40",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 41,
    author: "Penelope",
    titles: {
      ar: "عنوان عربي 41",
      en: "English Title 41",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 42,
    author: "Christopher",
    titles: {
      ar: "عنوان عربي 42",
      en: "English Title 42",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 43,
    author: "Lily",
    titles: {
      ar: "عنوان عربي 43",
      en: "English Title 43",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 44,
    author: "Joshua",
    titles: {
      ar: "عنوان عربي 44",
      en: "English Title 44",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 45,
    author: "Ella",
    titles: {
      ar: "عنوان عربي 45",
      en: "English Title 45",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 46,
    author: "Samuel",
    titles: {
      ar: "عنوان عربي 46",
      en: "English Title 46",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 47,
    author: "Grace",
    titles: {
      ar: "عنوان عربي 47",
      en: "English Title 47",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 48,
    author: "Ryan",
    titles: {
      ar: "عنوان عربي 48",
      en: "English Title 48",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 49,
    author: "Avery",
    titles: {
      ar: "عنوان عربي 49",
      en: "English Title 49",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 50,
    author: "Jackson",
    titles: {
      ar: "عنوان عربي 50",
      en: "English Title 50",
    },
    bodies: {
      ar: "النصوص الطويلة بلا سبب هي شيء موجود بكثرة، وهذه مجرد محاولة أخرى لإثبات ذلك، حيث يستمر النص في الظهور وكأنه لن ينتهي أبدًا.",
      en: "Unnecessarily long texts are a common thing, and this is just another attempt to prove that. The text keeps appearing as if it will never end.",
    },
  },
  {
    id: 51,
    author: "Olivia",
    titles: {
      ar: "عنوان عربي 51",
      en: "English Title 51",
    },
    bodies: {
      ar: "هذا النص هو مثال آخر على النصوص الطويلة التي لا تنتهي، والتي تهدف إلى إثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "This text is another example of endless long texts, intended to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 52,
    author: "Noah",
    titles: {
      ar: "عنوان عربي 52",
      en: "English Title 52",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 53,
    author: "Emma",
    titles: {
      ar: "عنوان عربي 53",
      en: "English Title 53",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 54,
    author: "Liam",
    titles: {
      ar: "عنوان عربي 54",
      en: "English Title 54",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 55,
    author: "Ava",
    titles: {
      ar: "عنوان عربي 55",
      en: "English Title 55",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 56,
    author: "William",
    titles: {
      ar: "عنوان عربي 56",
      en: "English Title 56",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 57,
    author: "Sophia",
    titles: {
      ar: "عنوان عربي 57",
      en: "English Title 57",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 58,
    author: "James",
    titles: {
      ar: "عنوان عربي 58",
      en: "English Title 58",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 59,
    author: "Isabella",
    titles: {
      ar: "عنوان عربي 59",
      en: "English Title 59",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 60,
    author: "Benjamin",
    titles: {
      ar: "عنوان عربي 60",
      en: "English Title 60",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 61,
    author: "Mia",
    titles: {
      ar: "عنوان عربي 61",
      en: "English Title 61",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 62,
    author: "Elijah",
    titles: {
      ar: "عنوان عربي 62",
      en: "English Title 62",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 63,
    author: "Charlotte",
    titles: {
      ar: "عنوان عربي 63",
      en: "English Title 63",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 64,
    author: "Oliver",
    titles: {
      ar: "عنوان عربي 64",
      en: "English Title 64",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 65,
    author: "Amelia",
    titles: {
      ar: "عنوان عربي 65",
      en: "English Title 65",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 66,
    author: "Henry",
    titles: {
      ar: "عنوان عربي 66",
      en: "English Title 66",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 67,
    author: "Abigail",
    titles: {
      ar: "عنوان عربي 67",
      en: "English Title 67",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 68,
    author: "Alexander",
    titles: {
      ar: "عنوان عربي 68",
      en: "English Title 68",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 69,
    author: "Harper",
    titles: {
      ar: "عنوان عربي 69",
      en: "English Title 69",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 70,
    author: "Daniel",
    titles: {
      ar: "عنوان عربي 70",
      en: "English Title 70",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 71,
    author: "Emily",
    titles: {
      ar: "عنوان عربي 71",
      en: "English Title 71",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 72,
    author: "Matthew",
    titles: {
      ar: "عنوان عربي 72",
      en: "English Title 72",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 73,
    author: "Elizabeth",
    titles: {
      ar: "عنوان عربي 73",
      en: "English Title 73",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 74,
    author: "Aiden",
    titles: {
      ar: "عنوان عربي 74",
      en: "English Title 74",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 75,
    author: "Ella",
    titles: {
      ar: "عنوان عربي 75",
      en: "English Title 75",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 76,
    author: "Joseph",
    titles: {
      ar: "عنوان عربي 76",
      en: "English Title 76",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 77,
    author: "Madison",
    titles: {
      ar: "عنوان عربي 77",
      en: "English Title 77",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 78,
    author: "David",
    titles: {
      ar: "عنوان عربي 78",
      en: "English Title 78",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 79,
    author: "Chloe",
    titles: {
      ar: "عنوان عربي 79",
      en: "English Title 79",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 80,
    author: "Michael",
    titles: {
      ar: "عنوان عربي 80",
      en: "English Title 80",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 81,
    author: "Scarlett",
    titles: {
      ar: "عنوان عربي 81",
      en: "English Title 81",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 82,
    author: "Christopher",
    titles: {
      ar: "عنوان عربي 82",
      en: "English Title 82",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 83,
    author: "Grace",
    titles: {
      ar: "عنوان عربي 83",
      en: "English Title 83",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 84,
    author: "Andrew",
    titles: {
      ar: "عنوان عربي 84",
      en: "English Title 84",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 85,
    author: "Victoria",
    titles: {
      ar: "عنوان عربي 85",
      en: "English Title 85",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 86,
    author: "Joshua",
    titles: {
      ar: "عنوان عربي 86",
      en: "English Title 86",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 87,
    author: "Lily",
    titles: {
      ar: "عنوان عربي 87",
      en: "English Title 87",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 88,
    author: "John",
    titles: {
      ar: "عنوان عربي 88",
      en: "English Title 88",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 89,
    author: "Addison",
    titles: {
      ar: "عنوان عربي 89",
      en: "English Title 89",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 90,
    author: "Samuel",
    titles: {
      ar: "عنوان عربي 90",
      en: "English Title 90",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 91,
    author: "Zoey",
    titles: {
      ar: "عنوان عربي 91",
      en: "English Title 91",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 92,
    author: "Anthony",
    titles: {
      ar: "عنوان عربي 92",
      en: "English Title 92",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 93,
    author: "Aubrey",
    titles: {
      ar: "عنوان عربي 93",
      en: "English Title 93",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 94,
    author: "Joseph",
    titles: {
      ar: "عنوان عربي 94",
      en: "English Title 94",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 95,
    author: "Savannah",
    titles: {
      ar: "عنوان عربي 95",
      en: "English Title 95",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 96,
    author: "Gabriel",
    titles: {
      ar: "عنوان عربي 96",
      en: "English Title 96",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
  {
    id: 97,
    author: "Brooklyn",
    titles: {
      ar: "عنوان عربي 97",
      en: "English Title 97",
    },
    bodies: {
      ar: "هل هناك نهاية لهذه النصوص الطويلة؟ أم أنها مجرد سلسلة لا نهائية من الكلمات التي لا معنى لها؟",
      en: "Is there an end to these long texts? Or are they just an endless series of meaningless words?",
    },
  },
  {
    id: 98,
    author: "Dylan",
    titles: {
      ar: "عنوان عربي 98",
      en: "English Title 98",
    },
    bodies: {
      ar: "قد يبدو هذا النص وكأنه لا ينتهي، ولكنه في الواقع مجرد تكرار لنفس الفكرة مرارًا وتكرارًا.",
      en: "This text may seem endless, but it's actually just a repetition of the same idea over and over again.",
    },
  },
  {
    id: 99,
    author: "Natalie",
    titles: {
      ar: "عنوان عربي 99",
      en: "English Title 99",
    },
    bodies: {
      ar: "النصوص الطويلة هي وسيلة لإضاعة الوقت، ولكنها أيضًا وسيلة لإثبات نقطة معينة حول وفرة هذه النصوص.",
      en: "Long texts are a waste of time, but they're also a way to prove a point about the abundance of such texts.",
    },
  },
  {
    id: 100,
    author: "Ryan",
    titles: {
      ar: "عنوان عربي 100",
      en: "English Title 100",
    },
    bodies: {
      ar: "تستمر النصوص في الظهور وكأنها لا تريد أن تتوقف، مما يثير التساؤل حول الهدف من هذه النصوص الطويلة.",
      en: "Texts keep appearing as if they don't want to stop, raising questions about the purpose of these long texts.",
    },
  },
];

async function seedFakePosts() {
  try {
    const { data, error } = await supabase.from("postsb").insert(fakePosts);

    if (error) throw error;

    console.log("Successfully seeded posts:", data);
    return data;
  } catch (error) {
    console.error("Error seeding posts:", error);
    return null;
  }
}
seedFakePosts();
export { seedFakePosts };
/////////////////////// sqlite approach

/*

import sql from "better-sqlite3";

const db = new sql("posts.db");

function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY,
          author TEXT,
          titles TEXT,  -- Will store JSON {ar: "...", en: "..."}
          bodies TEXT   -- Will store JSON {ar: "...", en: "..."}
        );
      `);
}

initDb();

function seedFakePosts() {
  // Clear table before inserting new data
  db.exec("DELETE FROM posts");

  const insertStmt = db.prepare(`
          INSERT INTO posts (id, author, titles, bodies)
          VALUES (?, ?, ?, ?)
        `);

  for (const post of fakePosts) {
    insertStmt.run(
      post.id,
      post.author,
      JSON.stringify(post.titles), // Convert titles object to JSON string
      JSON.stringify(post.bodies) // Convert bodies object to JSON string
    );
  }
}
seedFakePosts();
*/
