/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



	//function callJNIdrawLevel() {
		//drawLevel();
	//	    JNIbuildLevel();
	//}
        
function runLoop() {
		
		//prepare timer
		//Date startDate = new Date();
		//nextGameTick = performance.now();// startDate.getTime();
                console.log("start");
                var room = 0;
		  ///////////////////////////////////////////////////////
		  // PLAY THE GAME: 'while'
		  if(mPlayAgain && is_game_running ) {
		    mPlayAgain = false;
		
			
			// new score ?? SAVE OLD SCORE!!
		    //mGameV.setOldGuyScore(mHighScores.getScore());
			
		    ////////////////////////////////////////////////////////
		    // PREP FOR GAME PLAY
		    // set lives
		    lives = 3;
                    score = 10;
                    level = 0;
                    
		    //if (!mGameV.isUseSavedBundle()) mGameV.setLives(3);
		    // set room num
		    
		    
		    //if (!mGameV.isUseSavedBundle()) mGameV.setScore(10);
		    
		    //mGameV.setEndGame(false);
                    is_end_game = false;
		    
                    console.log("b");
                    
                    // USED TO BE WHILE
		    if( level <=  AG.NUM_LEVELS  && ! is_end_game 
		    		&& is_game_running && lives > 0) {

   
		     // advance through rooms
                     console.log("c rooms");
                     
                //Log.e("xml", "tot "+ mGameV.getLevelList().size() + " " + mGameV.getTotNumRooms() + " " + mGameV.getRoomNo());

		    
		    if (true) {




		    	//init room
				//mGameV.setFinishedLoading(false);
                                //is_finished_loading = false;
                level += 1;                
                room = level - 1;
                //setupDrawFunctionsB();
                clearSpriteList();
                clearMap();
                
                level_h = map_list[room].ydim;
                level_w = map_list[room].xdim;


                setLevelData(map_list[room].visible , map_list[room].hidden, map_list[room].xdim, map_list[room].ydim);
                initLevel();

                //preferences_monsters = false;
                //preferences_collision = false;
                //checkValues();
                //console.log(level_h + " " + level_w + " m:"+ map_level[3][2]);
                //drawLevel(0);
                                
                //mGameV.getBackground().setLevel(mGameV.getLevelList().getNum(mGameV.getRoomNo()-1));

                
		mFirstLoad = false;

				//mHandler.sendEmptyMessage(GameStart.STARTLEVEL);
		    	
		    }

		    
    		
                    
                    is_end_level = false;
                    is_game_death = false;

				//mPanel.setColorOnlyJNI(Panel.JNI_FALSE);
		    	//mPanel.setJNIAnimateOnly(Panel.JNI_FALSE);
		    
			mLoop = true;
                    // USED TO BE WHILE
		    if(mLoop &&  is_game_running && ! is_end_level ) { // GAME PLAY LOOP
		       var mIsNotLate = false;
		    	//mCanvas = null;
		    	if (is_game_running ) mIsNotLate = true;//gameSpeedRegulator(); //call inside 'game play' loop

		    	//mGameV.setGuyScore(mHighScores);

		    	
//		    	mGameV.getPanel().setPanelScroll(mMovementV.getScrollX(), mMovementV.getScrollY());
    			
    			if (move_jump > 0) setKeyB(true);
    			else setKeyB(false);
    			
		    	if (mIsNotLate || true) {
		    		
			    	//mGameV.getPanel().setPanelScroll(mMovementV.getScrollX(), mMovementV.getScrollY());
		    		
		    		/* formerly above 'draw' */
		    		//mGameV.getPanel().setScoreLives(mGameV.getScore(), mGameV.getLives());
		    		
		    		checkRegularCollisions();

				checkPhysicsAdjustments();
									
				scrollBg(); //always call this last!!
					
					/* JNI method now calls 'drawLevel()' with animate var */
				drawLevel(0);
				//console.log("loop " + is_finished_loading );
                                is_end_level = true;// just for testing!!
                                
					/* at end of level -- call after 'drawLevel()' */
		    		if(is_end_level === true) {
		    			//mGameV.setEndLevel(true);
		    			//mGameV.decrementLives();
		    			//mGameV.setGameDeath(true);
                                        is_end_level = true;
                                        lives --;
                                        is_game_death = true;
		    		}
		    		
		    		/* changes during level -- call after 'drawLevel()' */
		    		//mHighScores.setLives(mGameV.getPanel().getLives());
		    		//mHighScores.setScore(mGameV.getPanel().getScore());
		    		//mGameV.setScore(mGameV.getPanel().getScore());
					
		    		/* call after 'drawLevel()' */
				//playSounds();
				return;	

					
		    	}
		
				

		    } // end of gameplay loop
		    

		    //mGameV.getPanel().setReturnBackgroundGraphics();


		    if ( lives < 1) {
				//mGameV.setEndGame(true);
                                is_end_game = true;
				//Log.e("xml", " lives " + mGameV.getLives());
			}
			else {
			}

			//mHandler.sendEmptyMessage(GameStart.GAMESTOP);
		      // ** CHECK IF LEVEL IS OVER ***
		      // * advance the room count if it is
		      // * necessary.
		      //
		      if (! is_game_death) {
		        //mGameV.incrementRoomNo();
		        level ++;
                        is_end_game = false;
                        is_end_level = false;
		        //mGameV.setEndGame(false);
		        //mGameV.setEndLevel(false);
		      }
		      else {
		        //mGameV.setEndLevel(true);
                        is_end_level = true;
		      }
	    	


		      // increment cycle count and set room to 1...
		      if( level > AG.NUM_LEVELS  &&  ! is_end_level  ) {
		        
                        level = 1;
		    	  //mGameV.setRoomNo(1);
		    	  //saveRoomNo();

		      }
			   //mGameV.setUseSavedBundle(false);

		      
		      if (! is_game_death && is_game_running ) {
                          console.log("congrats");
                          alert("congrats");
		    	  //mHandler.sendEmptyMessage(GameStart.CONGRATS);
		      }
		      //if (!mGameV.isGameRunning()) {
                  //setReturnValues();
                        //}

		      
		    } /////////// while NUM_ROOMS loop

		    if ( is_game_running) {


                //// this is not used ...

		    	// this basically saves high scores...
  		      	// duplicated in 'onPause()'
      		      
  		        //mScores.insertHighInTableIfRanks(mHighScores);
                ///// this ends not used...
                console.log("save score, play again?");
                alert("play again?");
				//mHandler.sendEmptyMessage(GameStart.PLAYAGAIN);

            }

              mPlayAgain = false;

		  } // playAgain



            //while (true);// spinlock
	}
        
function gameSpeedRegulator() {
		
		var mIsNotLate = true;
                var framesPerSec = AG.FRAMES_PER_SECOND;
		var skipTicks = 1;
                
		//var newDate = new Date();
		ticksElapsed = performance.now();//newDate.getTime();
		nextGameTick += skipTicks;
		sleepTime = nextGameTick - ticksElapsed;

		
		if ( (sleepTime >= 0 && is_game_running ) || framesPerSec < 0 ) {
		
			//Log.e("InnerGameLoop", "---Passing time");
                        //if (framesPerSec > 0) Thread.sleep(sleepTime);
		
                        mIsNotLate = true;
		}
		else {
			console.log("InnerGameLoop ---Running behind");
			//newDate = new Date();
			nextGameTick = performance.now();//newDate.getTime();
			//ticksElapsed = newDate.getTime();
			mIsNotLate = false;
		}
		return mIsNotLate;
	}
	/*
	function setInitialBackgroundGraphics() {
		mHighScores = mGameV.getGuyScore();

		
		scrollX = mMovementV.getScrollX();
		scrollY = mMovementV.getScrollY();

		mGameV.setSpriteStart();
		mGuySprite = mGameV.getSpriteStart();
		mGameV.adjustSpriteStartPos();

		var monsters = JNI_FALSE;
		var collision = JNI_FALSE;
		if(true) monsters = JNI_TRUE;
		if(true) collision = JNI_TRUE;
		setMonsterPreferences(monsters, collision);


	}
        */

        /*
	function setReturnBackgroundGraphics() {
		mHighScores = mGameV.getGuyScore();
		
		setScoreLives(mGameV.getScore(), mGameV.getLives());
		mHighScores.setLives(mGameV.getLives());
		mHighScores.setScore(mGameV.getScore());
		
		scrollX = mGameV.getScrollX();
		scrollY = mGameV.getScrollY();
		setJNIScroll(scrollX, scrollY);
		
		mGuySprite = mGameV.getSpriteStart();

		var monsters = JNI_FALSE;
		var collision = JNI_FALSE;
		if(mHighScores.isEnableMonsters()) monsters = JNI_TRUE;
		if(mHighScores.isEnableCollision()) collision = JNI_TRUE;
		setMonsterPreferences(monsters, collision);


	}
        */

    /*

	function setGameValues(GameValues g) {
		mGameV = g;

	}
	
	
	GameValues getGameValues() {
		return mGameV;
	}
	*/
	
	function setPanelScroll( x,  y) {
		scrollX = x;
		scrollY = y;
		mGuySprite = guy;//mGameV.getSpriteStart();
		var mGuyX = mGuySprite.x;
		var mGuyY = mGuySprite.y;
		
		setGuyPosition(mGuyX  , mGuyY , scrollX, scrollY, newGuy);
		

	}

    
	
	
	function checkPhysicsAdjustments() {

		    readKeys();

        mCapturedPhysics = false;
        /*
        if (mGameV.getBossState() == AG.BOSS_STATE_CAPTURED) {
            mObjects.checkCapturedPhysics();
            //canFall = false;
            mCapturedPhysics = true;
        }
        */

		/* All sorts of adjustments go here. ladder, jump, gravity, 
		 * the ground, and solid objects in general.
		 */
		var guyBox = makeSpriteBox(guy,x,y);//mGuySprite,0,0


		var jumpHeight = 15;


		/* LADDER TEST */
		if (ladderTest) {
			canFall = false;
            //mMovementV.setVMoveReset();
            //y = mMovementV.getVMove();
            //mCanFallAtEdge = false;
			//Log.v("ladder test", "canfall = false;");

		}

		else if (y  < 0 && jumptime <= 0 && !mCapturedPhysics){
			y = 0;
			canFall = true;
            //mCanFallAtEdge = true;
		}

		if (!mCapturedPhysics) {
            collisionWithBlocks();
        }
		
		/* PLATFORMS */
        if (!mCapturedPhysics) {
            canJump = collisionWithPlatforms(canFall);
        }
		
		/* JUMP */
		
		//used to test for jumping
		
		var mSprite = guy;// mGameV.getSprite(0);
		var mTestCenterX = mSprite.x + Math.floor((mSprite.leftBB + mSprite.rightBB ) /2);
		var mTestBelowY = mSprite.y + mSprite.bottomBB + 2;

		if(jumptime <= 0 && y === 0 &&  keyB &&
				(pointToBlockNum(mTestCenterX,mTestBelowY - 16) !== AG.B_BLOCK  && 
				pointToBlockNum(mTestCenterX,mTestBelowY - 8) !== AG.B_BLOCK ) && 
				(pointToBlockNum(mTestCenterX, mTestBelowY) ===  AG.B_BLOCK || 
				ladderTest || guyBox.bottom === level_h  * 8 || canJump)) {

                        //mMovementV.setVMoveReset();
			jumptime =  MOVE_CONST * jumpHeight;
			keyB = false;
                        //console.log("jump");
		}
		
		
			
		/* 
		 * Here we implement the gravity.
		 */
		if(canFall && !ladderTest && !canJump && !mCapturedPhysics) {
            //mMovementV.setVMoveReset();
			y = y + MOVE_CONST;// mMovementV.getVMove() ;
            //if(mCloseBottomGap) y = mMovementV.getVMove();
            //mCloseBottomGap = false;
		
		}

		/*
		 * handle jumps.
		 */
		if (jumptime > 0) {
			jumptime = jumptime - MOVE_CONST;// mMovementV.getVMove() ;
			y =  - MOVE_CONST;// mMovementV.getVMove();// * 2 / 3);
			//if(jumptime >  mMovementV.getVMove() * 3) x = 0;
			canFall = false;
            //mCanFallAtEdge = false;
			//Log.v("functions","jumping");
		}


                guy.y = y + guy.y;
                guy.x = x + guy.x;
        //Log.e("Platforms",   " y=" + y	+ "  " + mCloseBottomGap);

    }

	function collisionWithBlocks() {
		var mSkip = false;
                mCloseBottomGap = false;
                //var x = move_lr;
                //var y = move_ud;
		var mSprite = guy;//sprite[0];// mGameV.getSprite(0);
		
		var mPattern = makeDetectionPattern( AG.B_BLOCK, MOVE_CONST);// mMovementV.getHMove());
		var mPatternFloor = makeDetectionPattern( AG.B_BLOCK, 1);
		var mPatternLadder = makeDetectionPattern( AG.B_LADDER,2);
		var mPatternSpace = makeDetectionPattern( AG.B_SPACE, 3);
		
		var mTestBottomY = mSprite.y  + mSprite.bottomBB - MOVE_CONST;// mMovementV.getVMove();
		var mTestRightSkipX = mSprite.x  + mSprite.rightBB + (MOVE_CONST + 1) ;//(mMovementV.getHMove() + 1);
		var mTestLeftSkipX = mSprite.x  + mSprite.leftBB - (MOVE_CONST + 1);//(mMovementV.getHMove() + 1);
		
		mCanFallAtEdge = true;

		//skip RIGHT
		if (x > 0 &&  mCanSkip &&
				mPattern.lowerRight &&
				pointToBlockNum(mTestRightSkipX, mTestBottomY - 8) !== AG.B_BLOCK  &&
				pointToBlockNum(mTestRightSkipX, mTestBottomY - 16) !==  AG.B_BLOCK) {
			canFall = false;
            //mCanFallAtEdge = false;
			y = - MOVE_CONST;// move_ud;//( mMovementV.getVMove());
			x = x + MOVE_CONST;// move_lr;//mMovementV.getHMove();
			mSkip = true;
		}
		
		//skip LEFT
		if ( x < 0 && mCanSkip &&
				mPattern.lowerLeft &&
				pointToBlockNum(mTestLeftSkipX, mTestBottomY - 8) !== AG.B_BLOCK &&
				pointToBlockNum(mTestLeftSkipX, mTestBottomY - 16) !== AG.B_BLOCK ) {
			canFall = false;
            //mCanFallAtEdge = false;
			y = - MOVE_CONST;// move_ud;//( mMovementV.getVMove());
			x = x - MOVE_CONST;//  move_lr;//mMovementV.getHMove();
			mSkip = true;
		}
		
		
		//drop when you hit a wall

		if ( !mPatternFloor.bottom && !ladderTest && !mSkip &&
				(mPattern.upperLeft || mPattern.upperRight || mPattern.lowerLeft || mPattern.lowerRight )) {
			y = MOVE_CONST;// mMovementV.getVMove();

			if (x < 0 && (mPattern.lowerLeft || mPattern.upperLeft )) {
				x = 0;
				canFall = true;
                //mCanFallAtEdge = true;
			}
			if (x > 0 && (mPattern.lowerRight || mPattern.upperRight)) {
				x = 0;
				canFall = true;
                //mCanFallAtEdge = true;
			}
			
			
		}
		
		//stop when you hit a wall
		if (!mSkip) {	
			if (x < 0  && ((mPattern.lowerLeft && !mPatternLadder.bottom ) || 
					mPattern.upperLeft ) 
					&& !mPatternSpace.lowerLeft ) {
				x = 0;
			}
			if (x > 0  && ((mPattern.lowerRight && !mPatternLadder.bottom ) || 
					mPattern.upperRight ) 
					&& !mPatternSpace.lowerRight ) {
				x = 0;
			}
		}


        //floor
		if (mPatternFloor.bottom ) {
			canFall = false;
                        mCanFallAtEdge = false;
			//mMovementV.setDirectionKeyDown(0);
			if (y > 0) y = 0;
            //Log.e("Platforms",   " y=" + y	);
            //mCloseBottomGap = false;

		}

		
		//no HANGING
		if (jumptime >=0 && !ladderTest && mPattern.top ) {
			y = MOVE_CONST;//move_ud;//mMovementV.getVMove();
			canFall = true;
                        mCanFallAtEdge = true;
			jumptime = -1;
		}

        if(mCloseBottomGap && !canFall && ! ladderTest && !mSkip && jumptime <= 0) {
            y = 1;// mMovementV.getVMove();
        }
        //move_ud = y;
        //move_lr = x;

		return;
	}
	
	
	function collisionWithPlatforms( canFall) {
		var i, j;
		//
          var guyBox, platformBox;
          var temp =     canJump;
          guyBox = makeSpriteBox( guy,0,0);
          var mFacingRight = true;

          if (level === -1) return canJump;

          temp = false;
		  
		  for (i = platform_offset + 1 ; i <=  platform_num ; i ++) {
		    j = i ; // i - 1;
			/* get info from JNI on platform position */
                        /*
                        var mSprite = sprite[j];
                        console.log(mSprite.rightBB + " " + mSprite.topBB + " " + mSprite.bottomBB);
                        
                        
		    var mTempSprite = new SpriteInfo( 0, 8, 0, 40);
		    
		  	mTempSprite.setMapPosX(    getSpriteX(j));
		  	mTempSprite.setMapPosY(    getSpriteY(j));
		  	if(   sprite[j].facingRight === 1) mFacingRight = true;
		  	else mFacingRight = false;
		  	mTempSprite.setFacingRight(mFacingRight);
		  	//Log.e("Platforms", "x="+mTempSprite.getMapPosX() + " y=" + mTempSprite.getMapPosY()	);
		  	*/
		  	
		  	/* check platform */
		    platformBox = makeSpriteBox( sprite[j],0,0);
		    var test = collisionSimple(guyBox, platformBox);
		    //temp = test;


		    if (test) {
		      temp = test;
		      //Log.e("Platforms", "Collision!!");
		      if ( guy.y  < sprite[j].y  ) { // stand on platforms
		        canFall = false;
                  //mCanFallAtEdge = false;
		        if (y > 0) y = 0;
		        if(sprite[j].facingRight ) {
		          x ++;
		        }
		        else {
		          x --;
		        }
		      }
		      if ( guy.y  > sprite[j].y ) { // below platforms
		        canFall = true;
                  //mCanFallAtEdge = true;
		        y = MOVE_CONST;// move_ud;// mMovementV.getVMove();
		      }
		    }

		  }

		  return temp;
		  
	}

	function scrollBg() {

		    //advanceMesh();

		/* scroll registers for background */
                var mRejectUp = false;

		canScroll = true;
		oldX = scrollx;// mMovementV.getScrollX();
		oldY = scrolly;// mMovementV.getScrollY();
		screenX = oldX;
		screenY = oldY;
		mapH = level_w;// mGameV.getMapH();
		mapV = level_h;// mGameV.getMapV();

		mapX = guy.x;//mGuySprite.getMapPosX();
		mapY = guy.y;//mGuySprite.getMapPosY();

                //x = move_lr;
                //y = move_ud;
                
		newMapX = mapX;
		newMapY = mapY;
                
                //mapH = level_h;
                //mapW = level_w;

		//newX = mGuySprite.getX();
		//newY = mGuySprite.getY();

		guyWidth = (guy.rightBB - guy.leftBB) + 5; // 12 ?
		guyHeight = guy.bottomBB - guy.topBB;

		var tilesMeasurement;

		
		if (true) {
			    //mScreenW =     mDisplayViewWidth;
			tilesMeasurement = 32;
                        mScreenW = AG.SCREEN_TILES_H *8;
                        
			//tilesMeasurement =  AG.SCREEN_TILES_H;//    mDisplayViewWidth /8 ;// TODO: test me!!
		}
		
		/* 
		 * determine position of guy on screen and determine position
		 * of background on screen also... set scrolling, etc. x and y
		 * are set by routine 'readKeys()'
		 */

		if (x > 0) {   

			if (oldX > mapH * 8 ) oldX = -1;

			if (oldX >= ((mapH - tilesMeasurement) * 8 - x)  ) canScroll = false;
			else canScroll = true;
			//move RIGHT?
			
			if ( mapX + x >= mapH * 8  - guyWidth) {
				newMapX = mapH * 8  - guyWidth;
				newX = mScreenW - guyWidth;

			}
			

			if ((mapX + x) >= (oldX + LR_MARGIN) ) {        


				if (canScroll ) {
					screenX += x;
					newMapX += x;
				}
				else if ( mapX <= (mapH ) * 8 - guyWidth ) {
					newX += x;
					newMapX += x;
				}

			}
			else if ((mapX + x) <= (oldX + LR_MARGIN) &&  canScroll) {
				//move sprite?
				newX += x;
				newMapX += x;

			}
			// very special case
			if(mapX + x + guyWidth > mapH * 8 + 1) {
				newMapX = mapH * 8  - guyWidth;
				newX = mScreenW - guyWidth;
                mRejectUp = true;
                if(mCanFallAtEdge) y = MOVE_CONST;//mMovementV.getVMove();
			}

		}  

		//////////////////////////////////////
		else if (x < 0) {   
			if (oldX > 8 * mapH + 1) oldX = -1;

			if (oldX <= 0 - x) canScroll = false;
			else canScroll = true;
			//move LEFT?
			if ( mapX + x <= 0) {
				newMapX = 1;
				newX = 1;

			}

			if ((mapX + x) <= (oldX +( (tilesMeasurement) * 8 ) - LR_MARGIN) ) {   //32 * 8     


				if (canScroll) {
					screenX  += x;
					newMapX += x;

				}
				else if ( mapX >= 0 ) {
					newX += x;
					newMapX += x; 

				}

			}
			else if ((mapX + x) >= (oldX + ( (tilesMeasurement) * 8) - LR_MARGIN) &&  canScroll) { // 32 * 8
				//move sprite?
				newX += x;
				newMapX += x;

			}

		}  

		//////////////////////////////////////
		if (y > 0) {   
			if (oldY > mapV * 8) oldY = -1; 

			if (oldY >= ((mapV - 24) * 8 - y) ) canScroll = false;
			else canScroll = true;
			//move DOWN?
			if (mapY + y >= mapV * 8  - guyHeight) {
				newMapY = mapV * 8  - guyHeight;
				newY = 24 * 8 - guyHeight;

			}

			if ((mapY + y) >= (oldY + TB_MARGIN) ) {        


				if (canScroll) {
					screenY += y;
					newMapY += y;
				}
				else if ( mapY <= mapV * 8  - guyHeight ) {
					newY += y;
					newMapY += y;
				}

			}
			else if ((mapY + y) <= (oldY + TB_MARGIN) &&  canScroll) {
				//move sprite?
				newY += y;
				newMapY += y;

			}

		}  
		////////////////////////////////////// 
		else if (y < 0 && !mRejectUp) {
			if (oldY > mapV * 8) oldY = -1;

			if (oldY < ( 0 - y) ) canScroll = false;
			else canScroll = true;
			//move UP?
			if ( mapY + y <= 0) {
				newMapY = 1;
				newY = 1;

			}

			if ((mapY + y) <= (oldY +( (24 ) * 8 ) - TB_MARGIN) ) { //32 * 8       


				if (canScroll && screenY + y > 0) {
					screenY += y;
					newMapY += y;

				}
				else if ( mapY >= 0 ) {
					newY += y;
					newMapY += y;
				}

			}
			else if ((mapY + y) >= (oldY + ( 24  * 8 ) - TB_MARGIN) &&  canScroll) { //32 * 8
				//move sprite?
				newY += y;
				newMapY += y;

			}

		}
		////////////////////////
		//special test for trouble spot:
		if (x > 0 && !canScroll && mapX + x >= mScreenW ) {
				//turn off skip
				mCanSkip = false;
		}
		else mCanSkip = true;
		////////////////////////
		
		//mGuySprite.setMapPosX(newMapX);
		//mGuySprite.setMapPosY(newMapY);
                guy.x = newMapX;
                guy.y = newMapY;
                //scrollX = screenX;
                //scrollY = screenY;
                
                scrollx = screenX;
                scrolly = screenY;
		
                
		//mMovementV.setScrollX(screenX);
		//mMovementV.setScrollY(screenY);
	}
        
	function checkRegularCollisions() {

		/*
		 * Here we create a BoundingBox for the guy character. Then
		 * we check the level for collisions. The object is to record when the 
		 * character comes varo contact with various objects.
		 */

		//BoundingBox guyBoxNext = makeSpriteBox(guy, x, y);
		var guyBox = makeSpriteBox(guy, x, y );
                var mGuySprite = guy;
                
		// set ladderTest to false
		ladderTest = false;
		blockTest = false;
		boundaryTest = false;
		boundaryLeft = false;
		boundaryRight = false;
		canFall = true;

            /*
            if(mObjects.getSeedsLeft() <= 0 && mGameV.getBossLevel()) {
			//win game
			if (mObjects.endBossLevel()) {
				//mGameV.setEndLevel(true);
                                is_end_level = true;
                                score += 1000;
				//    incrementJniScore(1000);
				//mGameV.incrementScore(1000);
				//mSounds.playSound(SoundPoolManager.SOUND_GOAL);
			}
		}
            */
		
		var i,j;

		for (j =  Math.floor(mGuySprite.x / 8) -1; j <  Math.floor(mGuySprite.x / 8) + 3; j ++ ) { // x coordinates
			for (i = Math.floor(mGuySprite.y / 8) - 1; i < Math.floor(mGuySprite.y / 8) + 3; i ++ ) { // y coordinates
				if(j >= 0 && j < level_w  && i >= 0 && i < level_h ) {// indexes OK?

					if (getObjectsCell(j,i)  !== 0 ) { // I/J or J/I... which one???

						/* save time here by checking the bounding 
						 * box only in the squares immediately surrounding
						 * the character...
						 * Instead of checking the whole field of play.
						 */

						var testMe = makeBlockBox(j,i); // j,i
						//bool testNext = collisionSimple(guyBoxNext, testMe);
						var test = collisionSimple(guyBox, testMe);

						/****** tests here ******/

						/*********  block ***************/
						if (test && getObjectsCell(j, i) === AG.B_BLOCK ) {
							blockTest = true;

						}
						/******** ladder **********/
						if (test && getObjectsCell(j, i) === AG.B_LADDER ) {
							ladderTest = true;
							//canFall = false;
						}

						/************ GOAL ****************/
						if (test && (getObjectsCell(j,i) === AG.B_GOAL  ) ) {

							//mGameV.setEndLevel(true);
                                                        is_end_level = true;
							
							//mGameV.setObjectsCell(j, i, 0);
							
							
							setObjectsDisplay(j, i, 0);//jni
                                                        score += 100;
							    //incrementJniScore(100);
							

							//mGameV.incrementScore(100);
							//mmEffect(SFX_GOAL);
                                                        
							//mSounds.playSound(SoundPoolManager.SOUND_GOAL);

						}
						/************ goal ends ****************/
						/************* prizes ******************/
						if (test && getObjectsCell(j,i) === AG.B_PRIZE  ) {

							
							//mGameV.setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							//    incrementJniScore(10);
							score += 10;

                                                        if (false) { // TESTING ONLY!!
                                                            is_end_level = true;
                                                            is_level_death = true;
                                                            play_again = true;
                                                            //console.log(guy.bottomBB +" "+ guy.topBB);
                                                        }
							//mGameV.incrementScore(10);
							//mmEffect(SFX_PRIZE);
							//mSounds.playSound(SoundPoolManager.SOUND_PRIZE);
						}

						/********** prizes end *****************/
						/************* keys   ******************/
						if (test && getObjectsCell(j,i) === AG.B_KEY  ) {

							
							//mGameV.setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							//    incrementJniScore(50);
							
							//mGameV.incrementScore(50);
                                                        score += 50;

							//mSounds.playSound(SoundPoolManager.SOUND_PRIZE);
							//data[level.usernum].level = level.room;
							//must save this data...
						}

						/**********   keys end *****************/
						/**************** oneup ****************/
						if (test && getObjectsCell(j,i) === AG.B_ONEUP  ) {

							
							//setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							

							//mSounds.playSound(SoundPoolManager.SOUND_GOAL);
                                                        lives ++;
							//mGameV.incrementLives();
						}
						/*****************end oneup *************/
						/**************** bigprize ****************/
						if (test && getObjectsCell(j,i) === AG.B_BIBPRIZE ) {

							
							//mGameV.setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							    //incrementJniScore(200);
							score += 200;

							//mGameV.incrementScore(200);
							//mmEffect(SFX_PRIZE);
							//mSounds.playSound(SoundPoolManager.SOUND_PRIZE);

						}
						/*****************end bigprize *************/
						/************ death ****************/
						if (test && getObjectsCell(j,i) === AG.B_DEATH && is_game_death === false) {

							//mGameV.setGameDeath(true);
							//mGameV.setEndLevel(true);
							//mGameV.decrementLives();
                                                        is_game_death = true;
                                                        is_end_level = true;
                                                        lives --;

							//mmEffect(SFX_OW);
							//mSounds.playSound(SoundPoolManager.SOUND_OW);
						}
						/************ death ends ****************/
						/****** end tests  ******/

						//mHighScores.setAll(mGameV, mGameV.getUsernum());
						//mHighScores.setAll(mGameV.getGuyScore());

					}//if block
				} // indexes OK?
				else {

					boundaryTest = true;
					if(j >= level_w -1) boundaryRight = true;
					if(j <= 1) boundaryLeft = true;
				}
			} // i block
		} // j block

		

	}
	
	
	function setKeyB( b) {
		keyB = b;
	}



	function isAnimationOnly() {
		return mAnimationOnly;
	}


	function setAnimationOnly( mAnimationOnly) {
		    mAnimationOnly = mAnimationOnly;
	}


	/**  used to refresh reference to Guy Sprite before start of level. **/
	function setGuySprite( sprite) {
		mGuySprite = sprite;
	}
	
	

	/*
	Record getHighScores() {
		return mHighScores;
	}


	function setHighScores(Record mHighScores) {
		    mHighScores = mHighScores;
	}
	

	var isEnableSounds() {
		return mEnableSounds;
	}


	function setEnableSounds(var mEnableSounds) {
		    mEnableSounds = mEnableSounds;
		mSounds.setEnabled(mEnableSounds);
	}
	*/


	  


	 function readKeys() {		

		/* set x and y as determined by game pad input */
		x=0;
		y=0;

        //if(mCapturedPhysics) return;

        //keyB = false;

		//changeX = false;
		//changeY = false;

                x = move_lr;
                y = move_ud;
                if (move_jump > 0) setKeyB(true);
                else setKeyB(false);
                
                /*
		if(mMovementV.getDirectionLR() == MovementValues.KEY_RIGHT) {

			x =  (var) + (mMovementV.getHMove() * mXMultiplier);
			//changeX = true;
			//keyB = false;
		}
		if(mMovementV.getDirectionLR() == MovementValues.KEY_LEFT) {
			x =   (var) - (mMovementV.getHMove() * mXMultiplier);
			//changeX = true;
			//keyB = false;
		}
		if(mMovementV.getDirectionUD() == MovementValues.KEY_UP) {
			y =  (var) - (mMovementV.getVMove() * mYMultiplier);
			//changeY = true;
			//keyB = false;
		}
		if(mMovementV.getDirectionUD() == MovementValues.KEY_DOWN) {
			y =  (var) + (mMovementV.getVMove() * mYMultiplier);
			//changeY = true;
			//keyB = false;
		}
                */
		

	}
	
	
	

	function makeDetectionPattern( type,  cheat){
		//var mTemp = new DetectionPattern();
                var  mTemp = Object.assign({},DetectionPattern);

		mTemp.type = type; //setType(type);
		var mSprite = guy;//sprite[0];//mGameV.getSprite(0);
		
		var mTestCenterX = mSprite.x + Math.floor((mSprite.leftBB + mSprite.rightBB) / 2);
		var mTestBelowY = mSprite.y + mSprite.bottomBB + cheat;
		var mTestAboveY = mSprite.y + mSprite.topBB - cheat;
		
		var mTestLowerY = mSprite.y + mSprite.bottomBB - cheat;
		var mTestUpperY = mSprite.y + mSprite.topBB + cheat;
		var mTestRightX = mSprite.x + mSprite.rightBB + cheat;
		var mTestLeftX = mSprite.x + mSprite.leftBB - cheat;


		if (pointToBlockNum(mTestCenterX, mTestAboveY) === type) mTemp.top = true; //setTop(true);
		
		if (pointToBlockNum(mTestCenterX - 2, mTestBelowY) === type
			|| pointToBlockNum(mTestCenterX + 2, mTestBelowY) === type) {
			mTemp.bottom = true;//setBottom(true);

            var height = mSprite.bottomBB - mSprite.topBB;
            var mTestBlockY =  (( Math.floor(mTestBelowY/8) + 1)*8) - (newMapY + height ) ;

            if(type ===   AG.B_BLOCK && mTestBlockY  <= 8*4 && mTestBlockY >= 8*3 ) {
                mCloseBottomGap = true;
            }

        }
		
		if (pointToBlockNum(mTestLeftX, mTestUpperY) === type) mTemp.upperLeft = (true);
		if (pointToBlockNum(mTestLeftX, mTestLowerY) === type) mTemp.lowerLeft = (true);
		
		if (pointToBlockNum(mTestRightX, mTestUpperY) === type) mTemp.upperRight = (true);
		if (pointToBlockNum(mTestRightX, mTestLowerY) === type) mTemp.lowerRight = (true);
		
		if (type === AG.B_BLOCK ) {
			
			if (mSprite.x + mSprite.rightBB + cheat > level_w  * 8) {
				mTemp.upperRight = (true);
				mTemp.lowerRight = (true);
            }
			if (mSprite.x + mSprite.leftBB - cheat < 0) {
				mTemp.lowerLeft = (true);
				mTemp.upperLeft = (true);
			}
			if (mSprite.y + mSprite.bottomBB + cheat > level_h  * 8  ) {
				mTemp.bottom = (true);
				//mMovementV.setmVMoveShave();
                //Log.e("Platforms",   " mclose =" + mCloseBottomGap	);

                //mCloseBottomGap = true;
			}

            if (mSprite.y + mSprite.bottomBB + move_ud  > level_h  * 8 ) {
                mTemp.bottom = (true);
                //mMovementV.setmVMoveShave();
            }
			if (mSprite.y + mSprite.topBB - cheat < 0 ) {
				mTemp.top = (true);
			}
			
		}
		
		return mTemp;
	}
	
	/* query the jni for sprite info used for Bundle */
	function updateSpriteList() {
		for (var x = 0; x < mGameV.getSpriteListSize() - 1; x ++) {
			if(    getSpriteFacingRight(x) == 1) mGameV.getSprite(x + 1).setFacingRight(true);
			else mGameV.getSprite(x + 1).setFacingRight(false);
		}
	}
	
	/* strictly JNI oriented */
	function playSounds() {
		if(getSoundOw() == 1) {
			mSounds.playSound(SoundPoolManager.SOUND_OW);
			//Log.e("Play-Sound", "OW");
		}
		if(getSoundPrize() == 1) {
			mSounds.playSound(SoundPoolManager.SOUND_PRIZE);
		}
		if(getSoundBoom() == 1) {
			mSounds.playSound(SoundPoolManager.SOUND_BOOM);
			//Log.e("Play-Sound","BOOM");
		}
	}
	
	
	function addMonstersJNI() {
		for (var i = mGameV.getMonsterOffset(); i <= mGameV.getMonsterNum()  ; i ++) {
			var temp = mGameV.getSprite(i);
			addMonster(temp.getMapPosX(), temp.getMapPosY(), temp.getAnimIndex());

		}
	}
	
	function addPlatformsJNI() {
		if (mGameV.getPlatformNum() == -1) return;
		for (var i = mGameV.getPlatformOffset() ; i <=  mGameV.getPlatformNum(); i++) {
			var temp = mGameV.getSprite(i);
			addPlatform(temp.getMapPosX(), temp.getMapPosY());

		}
	}
	
        function pointToBlockNum(x, y) {
		var mNewX, mNewY;
		mNewX = Math.abs(Math.floor(x / 8));
		mNewY = Math.abs(Math.floor(y / 8));
                
		return getObjectsCell(mNewX, mNewY);
	}
        
        
        
	/*
	native function setLevelData( var [] a_map, var [] b_map,var width, var height);
	native function setObjectsDisplay(var map_x, var map_y, var value);
	native var getObjectsDisplay(var x, var y);
	native function setGuyData(var [] a, var [] b, var [] c, var [] d);
	native function setMonsterData(var [] a, var [] b, var [] c, var [] d);
	native function setMovingPlatformData(var []a);
	native function inactivateMonster(var num);
	native function setTileMapData( var [] a, var [] b, var [] c, var [] d);
	native function addMonster(var map_x, var map_y, var animate_index);
	native function addPlatform(var map_x, var map_y);
	native function setGuyPosition(var x, var y, var scrollx, var scrolly, var animate);
	native function setScoreLives(long score, var lives);
    native function setMonsterPreferences(var monsters, var collision);
    native function setJNIAnimateOnly(var animate);
    native function setScreenData(var screenH, var screenV);
	native function drawLevel(); // <-- remove me!!
	native var getSoundBoom();
	native var getSoundOw();
	native var getSoundPrize();
	native var getEndLevel();
	native long getScore();
	native var getLives();
	native function incrementJniScore(long num);
	native var getSpriteX(var num);
	native var getSpriteY(var num);
	native var getSpriteFacingRight(var num);
	native var setJNIScroll(var x, var y);
	//opengl native methods
	native function JNIinit();
	native function JNIdraw();
	native function JNIresize(var w, var h);
	native function JNIsetVersion(var v);
	native function JNIbuildLevel();
	native function setColorOnlyJNI(var c);
	//mesh native methods
    native function setupMeshJNI();
	native function setMeshDataJNI(var [] vertices, short [] faces, var [] normals, var[] texture, var obj_num, var part_num, var copy_obj, var copy_part);
	native function enableObjectPartJNI(var object_num, var part_num, var var_show, var x, var y, var z, var w);
	native function enableObjectJNI(var object_num, var var_show, var x, var y, var z, var w);
    native function setObjectPropertiesJNI(var object_num, var part_num, var r, var g, var b, var a);
	native function setObjectCheatJNI(var obj, var part, var x, var y, var z, var w);
	native function setObjectMagJNI(var obj, var part, var x, var y, var z);
	native function setObjectRotJNI(var obj, var part, var angle, var x, var y, var z);
    native function setObjectCopyJNI(var obj, var part, var copy_obj, var copy_part);
    native function setObjectCheatRotJNI(var obj, var part, var angle, var x, var y, var z);
	native function resetObjectCopyJNI(var obj, var part, var copy_obj, var copy_part);
	native function resetObjectMagRotJNI(var obj, var part, var copy_obj, var copy_part);
	native function resetObjectColorJNI(var obj, var part, var copy_obj, var copy_part, var r, var g, var b ); //usage is tricky!!
	native function resetObjectDrawNormalsJNI(var obj, var part, var var_normals );
	*/
	
	
	
