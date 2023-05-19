import { Button, Card, CardBody, Typography } from "../../components/MaterialCom";
import Link from "next/link";

async function fetchRepo(id) {
    const response = await fetch(`https://api.github.com/users/bradtraversy/${id}`);
    
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const repo = response.json();
    return repo;
}

const Params = async ({ params: { id } }) => {
    const repo = await fetchRepo(id);
    console.log(repo);
    return (
        <div className="flex  justify-center mx-auto">
            <div className="grid">
                <Link href="/docs">
                    <Button>Back To Repositories</Button>
                </Link>
                <Card className="w-96">
                    <CardBody>
                        <Typography varient="h5" color="pink">
                            {id}
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Params