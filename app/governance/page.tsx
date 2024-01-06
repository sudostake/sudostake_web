'use client'

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';
import { useQueryActiveProposals } from '../hooks/use_query';
import classNames from 'classnames';
import VoteOnProposalFlow from './widgets/vote_on_proposal_flow';
import { FaGlobe } from 'react-icons/fa';

export default function Governance() {
  const setToolBarState = useSetRecoilState(toolBarState);
  const { active_proposals } = useQueryActiveProposals();

  useEffect(() => setToolBarState({
    title: 'Active Proposals',
    show_back_nav: false
  }), [setToolBarState])

  return (
    <div className="h-full w-full overflow-y-scroll text-sm lg:text-base py-8 px-2 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {active_proposals.map((proposal, index) => {
          return (
            <div key={index} className={
              classNames({
                "w-full p-4 rounded-lg grid grid-cols-1 gap-8": true,
                "border border-zinc-400 dark:border-zinc-600": true,
              })
            }>
              <span className="flex items-center">
                <span>Proposal ID</span>
                <span className="ml-auto">
                  #{proposal.proposal_id}
                </span>
              </span>

              <span className="flex items-center">
                {proposal.content.title}
              </span>

              <VoteOnProposalFlow proposal={proposal} />
            </div>
          );
        })}
      </div>

      {
        active_proposals.length === 0 &&
        <div className="flex w-full h-full items-center justify-center">
          <h2 className="flex flex-row gap-2 items-center">
            <FaGlobe className="w-6 h-6 mr-2" />
            <span>No active proposal(s).</span>
          </h2>
        </div>
      }
    </div>
  )
}
