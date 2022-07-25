export { createMsTeamNotification };

async function createMsTeamNotification(event: any): Promise<any> {
  console.log('event 👉', event);

  return {
    body: JSON.stringify({ message: 'Successful lambda invocation' }),
    statusCode: 200,
  };
}
