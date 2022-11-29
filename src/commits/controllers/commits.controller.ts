import { Controller, Get, Param } from '@nestjs/common';
import { Octokit } from "octokit";

@Controller('commits')
export class CommitsController {
    @Get(':type')
    async commits(@Param() params): Promise<any> {
        try {
            const type = params.type;
            let repo: any;

            switch (type) {
                case 'backend':
                    repo = 'get-commits';
                    break;
                case 'frontend':
                    repo = 'get-commits-frontend';
                    break;
            }

            if (!!repo) {
                const octokit = new Octokit({
                    auth: process.env.GITHUB_TOKEN
                });

                const commits = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
                    owner: 'jgarciajovel',
                    repo: repo
                });

                return {
                    status: 'success',
                    commits: commits.data
                }
            } else {
                return {
                    status: 'error',
                    message: `Couldn't find any repo with that name`
                }
            }

            
        } catch (error) {
            return {
                status: 'error',
                message: error
            }
        }
    }
}
