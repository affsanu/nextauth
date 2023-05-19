import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    CardHeader,
    Tooltip
} from "../components/MaterialCom";

import { StarIcon, EyeIcon, ShareIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

async function ReposData() {
    const response = await fetch('https://api.github.com/users/bradtraversy/repos');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const repos = response.json();
    return repos;
}

const Docs = async () => {
    const repos = await ReposData();

    return (
        <div className='container mx-auto pt-4'>
            <h2>Repositories</h2>
            {repos.map((repo) => (
                <Card key={repo.id} className="mt-10 w-96 cursor-pointer">
                    <CardHeader color="pink" className="flex justify-center">
                        <Typography variant="h6" color="blue-gray" className="mb-2 uppercase">
                            <span className="h-auto items-center">{repo.name}</span>
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <Typography color="pink" className="font-bold">
                            {repo.description}
                        </Typography>
                        <div className="flex justify-between pt-2">
                            <Tooltip content="Like">
                                <span className="flex gap-1"> <StarIcon className="h-6" /> {repo.stargazers_count}</span>
                            </Tooltip>
                            <Tooltip content="Like">
                                <span className="flex gap-1"> <ShareIcon className="h-6" /> {repo.forks_count}</span>
                            </Tooltip>
                            <Tooltip content="Like">
                                <span className="flex gap-1"> <EyeIcon className="h-6" /> {repo.watchers_count}</span>
                            </Tooltip>
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-center gap-7 pt-2">
                        <Link href={`/docs/${repo.id}`} className="text-blue-600">
                            Read More
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Docs