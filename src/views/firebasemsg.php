use sngrl\PhpFirebaseCloudMessaging\Client;
use sngrl\PhpFirebaseCloudMessaging\Message;
use sngrl\PhpFirebaseCloudMessaging\Recipient\Device;
use sngrl\PhpFirebaseCloudMessaging\Notification;

$server_key = 'AIzaSyAh97g-wHYW8QWJObo31EmXvSx7mwvsVOU';
$client = new Client();
$client->setApiKey($server_key);
$client->injectGuzzleHttpClient(new \GuzzleHttp\Client());

$message = new Message();
$message->setPriority('high');
$message->addRecipient(new Device('d6lXbnRFTYeAvqHzI90x1a:APA91bHiCTRkvTHX4bkIg-wI7ImIeNaIaGyOL00rnhF_WmHa4i8mA9QLG8h4xnvgOjE1Pr6CEx9QvQ8B1B4wJzKbjN5zNhpWZn-MJX5wuyACZpoI29YrTpsD4pvjHGjZOOFNax961sxq'));
$message
    ->setNotification(new Notification('some title', 'some body'))
    
;

$response = $client->send($message);
var_dump($response->getStatusCode());
var_dump($response->getBody()->getContents());