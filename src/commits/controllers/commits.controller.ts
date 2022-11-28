import { Controller, Get, Req } from '@nestjs/common';
import { Octokit, App } from "octokit";
const octokit = new Octokit({
    auth: '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'
});

@Controller('commits')
export class CommitsController {
    @Get()
    async commits(@Req() request): Promise<any> {

        try {
            const commits = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
                owner: 'jgarciajovel',
                repo: 'get-commits'
            });
    
            return {
                status: 'success',
                commits: commits.data
            }
             
        } catch (error) {
            return {
                status: 'error',
                message: error
            }
        }
    }
}
