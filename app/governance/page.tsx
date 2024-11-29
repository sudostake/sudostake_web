'use client'

import { useQueryActiveProposals } from '../hooks/use_query';
import classNames from 'classnames';
import VoteOnProposalFlow from './widgets/vote_on_proposal_flow';
import { FaGlobe } from 'react-icons/fa';
import Loading from '../loading';
import { NAV_BAR_HEIGHT_SIZE } from '../utils/constants';

export default function Governance() {
  const { active_proposals, isLoading } = useQueryActiveProposals();

  return (
    <div className={classNames(
      `flex flex-col h-full overflow-y-auto overscroll-contain pt-${NAV_BAR_HEIGHT_SIZE} max-sm:pb-${NAV_BAR_HEIGHT_SIZE}`
    )}>
      <div className="px-4 py-8 flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800">
        <span className='text-3xl'>
          Active Proposals
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {active_proposals.map((proposal, index) => {
          return (
            <div key={proposal.id}
              className={classNames({
                "px-4 py-8": true,
                "flex flex-col gap-4": true,
                "w-full": true,
                "hover:shadow-lg dark:hover:bg-zinc-900": true,
                "border-t border-zinc-300 dark:border-zinc-600": true,
                "md:max-lg:border-r": index % 2 === 0,
                "md:max-lg:border-b": active_proposals.length <= 2 || index >= active_proposals.length - 2,
                "lg:border-r": (index + 1) % 3 !== 0,
                "lg:border-b": active_proposals.length <= 3 || index >= active_proposals.length - 3,
                "max-sm:border-b": index === active_proposals.length - 1,
              })}>
              <span className="flex items-center">
                <span>Proposal  #{proposal.id}</span>
              </span>

              <span className="flex items-center">
                {proposal.title}
              </span>

              <VoteOnProposalFlow proposal={proposal} />
            </div>
          );
        })}
      </div>

      {
        active_proposals.length === 0 && !isLoading &&
        <div className="flex w-full h-full items-center justify-center">
          <h2 className="flex flex-row gap-2 items-center">
            <FaGlobe className="w-4 h-4 mr-2" />
            <span>No active proposal(s).</span>
          </h2>
        </div>
      }

      {
        isLoading && <Loading />
      }
    </div>
  )
}
