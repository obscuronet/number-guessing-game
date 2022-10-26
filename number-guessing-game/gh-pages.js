var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/obscuronet/sample-applications.git',  
        user: {
            name: 'James Carlyle',
            email: 'james@obscu.ro'
        }
    },
    () => {
        console.log('Deployment complete!')
    }
)