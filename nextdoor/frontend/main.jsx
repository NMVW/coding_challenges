/*

Hello! At Nextdoor, our app’s primary purpose is displaying a newsfeed of your neighbors’ stories. We’d like you to write a reduced version of our app that displays a list of stories from a static JSON API.

 

Each story has an id, author, body, and image. The API returns 5 stories per page, and has multiple pages. You can find the 1st page of the API at: 

https://andrewmunn.github.io/newsfeed/page1.json

 

The format of the response is:


{
  "nextPageId": String,
  "stories": [
    {
      "id": String,
      "body": String,
      "author": String,
      "image": {
        "url": String,
        "width": Int,
        "height": Int
      }
    }, {
      < More Stories >
    }
  ]
}
 

You can build your app however you like, but here are some things to keep in mind:

We’re looking for modern component design that is testable and scalable.

Your app should aim to support infinite-scroll pagination

If you don’t know how to do something, that’s okay! Please feel free to look things up or ask for help.

*/

const NEWSFEED_API_DOMAIN = (pageNumber) => `https://andrewmunn.github.io/newsfeed/page${pageNumber}.json`;
const DEFAULT_IMG_URL = 'https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';

function NewsFeed () {

    const [ pageNum, setPageNum ] = React.useState(1);
    const [ stories, setStories ] = React.useState([]);

    const fetchStories = async (pageNum) => {
        const data = await fetch(NEWSFEED_API_DOMAIN(pageNum));
        const { nextPageId, stories } = await data.json();
        console.log('next set', nextPageId, stories.length);
        setStories(stories);
        setPageNum(+nextPageId);
    };

    React.useEffect(() => {
        // only on initial render
        fetchStories(pageNum);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            { stories.map((story) => (
                <div key={story.id} style={{ textAlign: 'center' }}>
                    <strong><p>{story.author}</p></strong>
                    <p>{story.body}</p>
                    <img onError={(ev) => {
                        // REFACTOR: sketchy, refactor to separate component with state
                        ev.target.src = DEFAULT_IMG_URL;
                    }} src={story.image.url} style={{ width: 300, height: 300 }} />
                </div>
            )) }
            { pageNum && <button onClick={() => fetchStories(pageNum)}>Next</button> }
        </div>
    );
}


const App = () => (
    <div className="app"><NewsFeed /></div>
);

ReactDOM.render(<App />, document.getElementById('app'));
