import {Component, Input, OnInit} from '@angular/core';
import {ReactionService} from "../../../services/reaction.service";
import * as _ from 'lodash';

@Component({
  selector: 'reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {
  @Input()
  postId: string | undefined;

  showEmojis = false;
  emojiList: string[];

  reactionCount: any;
  userReaction: any;

  subscription: any;

  constructor(private reactionService: ReactionService) { }

  ngOnInit(): void {
    this.emojiList = this.reactionService.emojiList;

    this.subscription = this.reactionService.getReactions(this.postId)
      .subscribe(reactions => {
        this.reactionCount = this.reactionService.countReactions(reactions);
        this.userReaction = this.reactionService.userReaction(this.postId, reactions);
      })
  }

  react(value: number | undefined) {
    if (this.userReaction === value) {
      this.reactionService.removeReaction(this.postId);
    } else {
      this.reactionService.addReaction(this.postId, value);
    }
  }

  toggleShow(value: boolean) {
    this.showEmojis = value;
  }

  hasReactions(index: { toString: () => any; }) {
    return _.get(this.reactionCount, index.toString())
  }

  emojiPath(emoji: any) {
    return `assets/reactions/${emoji}.png`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
