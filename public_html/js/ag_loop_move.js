/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




	var mContext;
	var mGameV;
	var mCanvas;
	var mObjects;

	var mMovementV;
	var mHighScores;
	var mDisplayViewWidth;
	//Matrix mMatrix;
	
	var scrollX, scrollY;
	
	var mGuySprite;
	var mP;
	var mScaleH = 2;
	var mScaleV = 2;

	var mDimensionWidth,mDimensionHeight;

	////////////start mesh stuff ///////////////
	//var mRotationTest = 0.0f;
    //var X_COORDS =0, Y_COORDS = 1, Z_COORDS = 2, W_COORDS = 3;
    //var[][][] mMeshTrackingCoords = new var[AG.GAME_TOTAL_OBJECTS_PER_LEVEL][AG.GAME_TOTAL_MESHES_PER_OBJECT][4]; // x,y,z,w
	
	/* -- start 'for scrolling' -- */
	/* for scrolling */
	var LR_MARGIN = 80;
	var TB_MARGIN = 40;

	/* for scrolling, collision, etc. */
	var canScroll;
	var oldX;
	var oldY;
	var screenX;
	var screenY;
	var mapH;
	var mapV;
	
	var mCanSkip; // for problem spots
	
	var mScreenW;
	//var mScreenH;
	
	var mapX;
	var mapY;

	var newMapX;
	var newMapY;

	var newX;
	var newY;

	var guyWidth; 
	var guyHeight;

	var x;
	var y;

	var keyB = false;
	var jumptime;

	var MOVE_CONSTANT = 3;
	var mXMultiplier = 1;
	var mYMultiplier = 1;

	var ladderTest = false;
	var blockTest = false;
	var boundaryTest = false;
	var boundaryLeft = false;
	var boundaryRight = false;
	var canFall = false;
    var mCanFallAtEdge = false;
	var canJump = false;
    var mCloseBottomGap = false;
    var mCapturedPhysics = false;
	
	var END = 1;
	var MIDDLE = 2;
	var START = 3;

	var JNI_TRUE = 1;
	var JNI_FALSE = 0;
	
	/* -- end 'for scrolling' -- */

	/* for monster animation */
	var ANIM_SPEED = 5;


	/* animation vars */
	var ANIMATE_SPEED = 0;
	var animate, newGuy, newBG, lastGuy, lastBG;

	/* test jni */
	//var screen = new var [192 * 256];
	var mSounds;
	var mEnableSounds;
	var mAnimationOnly;
	var mSDKVersion;
	
	
	function callJNIdrawLevel() {
		//drawLevel();
		    JNIbuildLevel();
	}
	
	function setInitialBackgroundGraphics() {
		mHighScores = mGameV.getGuyScore();

		
		/*** set initial scroll positions ***/ 
		scrollX = mMovementV.getScrollX();
		scrollY = mMovementV.getScrollY();

		/*** Load sprites for level ***/
		mGameV.setSpriteStart();
		mGuySprite = mGameV.getSpriteStart();
		mGameV.adjustSpriteStartPos();

		/* JNI Monster Collision setting */
		var monsters = JNI_FALSE;
		var collision = JNI_FALSE;
		if(true) monsters = JNI_TRUE;
		if(true) collision = JNI_TRUE;
		setMonsterPreferences(monsters, collision);


	}

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
		mGuySprite = mGameV.getSpriteStart();
		var mGuyX = mGuySprite.getMapPosX();
		var mGuyY = mGuySprite.getMapPosY();
		
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
		BoundingBox guyBox = BoundingBox.makeSpriteBox(mGuySprite,x,y);//mGuySprite,0,0


		var jumpHeight = 15;


		/* LADDER TEST */
		if (ladderTest) {
			canFall = false;
            mMovementV.setVMoveReset();
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
		
		SpriteInfo mSprite = mGameV.getSprite(0);
		var mTestCenterX = mSprite.getMapPosX() + (mSprite.getLeftBB() + mSprite.getRightBB()) /2;
		var mTestBelowY = mSprite.getMapPosY() + mSprite.getBottomBB() + 2;

		if(jumptime <= 0 && y == 0 &&  keyB &&
				(povarToBlockNum(mTestCenterX,mTestBelowY - 16) != mGameV.mBlock && 
				povarToBlockNum(mTestCenterX,mTestBelowY - 8) != mGameV.mBlock) && 
				(povarToBlockNum(mTestCenterX, mTestBelowY) == mGameV.mBlock || 
				ladderTest || guyBox.getBottom() == mGameV.getMapV() * 8 || canJump)) {

            mMovementV.setVMoveReset();
			jumptime = mMovementV.getVMove() * jumpHeight;
			keyB = false;
		}
		
		
			
		/* 
		 * Here we implement the gravity.
		 */
		if(canFall && !ladderTest && !canJump && !mCapturedPhysics) {
            //mMovementV.setVMoveReset();
			y = y + mMovementV.getVMove() ;
            //if(mCloseBottomGap) y = mMovementV.getVMove();
            //mCloseBottomGap = false;
		
		}

		/*
		 * handle jumps.
		 */
		if (jumptime > 0) {
			jumptime = jumptime - mMovementV.getVMove() ;
			y =  - mMovementV.getVMove();// * 2 / 3);
			//if(jumptime >  mMovementV.getVMove() * 3) x = 0;
			canFall = false;
            //mCanFallAtEdge = false;
			//Log.v("functions","jumping");
		}



        //Log.e("Platforms",   " y=" + y	+ "  " + mCloseBottomGap);

    }

	function collisionWithBlocks() {
		var mSkip = false;
        mCloseBottomGap = false;

		SpriteInfo mSprite = mGameV.getSprite(0);
		
		DetectionPattern mPattern = makeDetectionPattern(mGameV.mBlock, mMovementV.getHMove());
		DetectionPattern mPatternFloor = makeDetectionPattern(mGameV.mBlock, 1);
		DetectionPattern mPatternLadder = makeDetectionPattern(mGameV.mLadder,2);
		DetectionPattern mPatternSpace = makeDetectionPattern(mGameV.mSpace, 3);
		
		var mTestBottomY = mSprite.getMapPosY() + mSprite.getBottomBB() - mMovementV.getVMove();
		var mTestRightSkipX = mSprite.getMapPosX() + mSprite.getRightBB() + (mMovementV.getHMove() + 1);
		var mTestLeftSkipX = mSprite.getMapPosX() + mSprite.getLeftBB() - (mMovementV.getHMove() + 1);
		
		mCanFallAtEdge = true;

		//skip RIGHT
		if (x > 0 &&  mCanSkip &&
				mPattern.isLowerRight() &&
				povarToBlockNum(mTestRightSkipX, mTestBottomY - 8) != mGameV.mBlock &&
				povarToBlockNum(mTestRightSkipX, mTestBottomY - 16) != mGameV.mBlock) {
			canFall = false;
            //mCanFallAtEdge = false;
			y = - ( mMovementV.getVMove());
			x = x + mMovementV.getHMove();
			mSkip = true;
		}
		
		//skip LEFT
		if ( x < 0 && mCanSkip &&
				mPattern.isLowerLeft() &&
				povarToBlockNum(mTestLeftSkipX, mTestBottomY - 8) != mGameV.mBlock &&
				povarToBlockNum(mTestLeftSkipX, mTestBottomY - 16) != mGameV.mBlock) {
			canFall = false;
            //mCanFallAtEdge = false;
			y = -( mMovementV.getVMove());
			x = x - mMovementV.getHMove();
			mSkip = true;
		}
		
		
		//drop when you hit a wall

		if ( !mPatternFloor.isBottom() && !ladderTest && !mSkip &&
				(mPattern.isUpperLeft() || mPattern.isUpperRight() || mPattern.isLowerLeft() || mPattern.isLowerRight())) {
			y = mMovementV.getVMove();

			if (x < 0 && (mPattern.isLowerLeft() || mPattern.isUpperLeft())) {
				x = 0;
				canFall = true;
                //mCanFallAtEdge = true;
			}
			if (x > 0 && (mPattern.isLowerRight() || mPattern.isUpperRight())) {
				x = 0;
				canFall = true;
                //mCanFallAtEdge = true;
			}
			
			
		}
		
		//stop when you hit a wall
		if (!mSkip) {	
			if (x < 0  && ((mPattern.isLowerLeft() && !mPatternLadder.isBottom()) || 
					mPattern.isUpperLeft()) 
					&& !mPatternSpace.isLowerLeft()) {
				x = 0;
			}
			if (x > 0  && ((mPattern.isLowerRight() && !mPatternLadder.isBottom()) || 
					mPattern.isUpperRight()) 
					&& !mPatternSpace.isLowerRight()) {
				x = 0;
			}
		}


        //floor
		if (mPatternFloor.isBottom() ) {
			canFall = false;
            mCanFallAtEdge = false;
			mMovementV.setDirectionKeyDown(0);
			if (y > 0) y = 0;
            //Log.e("Platforms",   " y=" + y	);
            //mCloseBottomGap = false;

		}

		
		//no HANGING
		if (jumptime >=0 && !ladderTest && mPattern.ismTop()) {
			y = mMovementV.getVMove();
			canFall = true;
            mCanFallAtEdge = true;
			jumptime = -1;
		}

        if(mCloseBottomGap && !canFall && ! ladderTest && !mSkip && jumptime <= 0) {
            y = 1;// mMovementV.getVMove();
        }

		return;
	}
	
	
	function collisionWithPlatforms( canFall) {
		var i, j;
		//
          BoundingBox guyBox, platformBox;
          var temp =     canJump;
          guyBox = BoundingBox.makeSpriteBox( mGuySprite,0,0);
          var mFacingRight = true;

          if (mGameV.getPlatformNum() == -1) return canJump;

          temp = false;
		  
		  for (i = mGameV.getPlatformOffset() + 1 ; i <=  mGameV.getPlatformNum() ; i ++) {
		    j = i ; // i - 1;
			/* get info from JNI on platform position */
		    SpriteInfo mTempSprite = new SpriteInfo( 0, 8, 0, 40);
		    
		  	mTempSprite.setMapPosX(    getSpriteX(j));
		  	mTempSprite.setMapPosY(    getSpriteY(j));
		  	if(    getSpriteFacingRight(j) == 1) mFacingRight = true;
		  	else mFacingRight = false;
		  	mTempSprite.setFacingRight(mFacingRight);
		  	//Log.e("Platforms", "x="+mTempSprite.getMapPosX() + " y=" + mTempSprite.getMapPosY()	);
		  	
		  	
		  	/* check platform */
		    platformBox = BoundingBox.makeSpriteBox( mTempSprite,0,0);
		    var test = BoundingBox.collisionSimple(guyBox, platformBox);
		    //temp = test;


		    if (test) {
		      temp = test;
		      //Log.e("Platforms", "Collision!!");
		      if ( mGuySprite.getMapPosY() < mTempSprite.getMapPosY()) { // stand on platforms
		        canFall = false;
                  //mCanFallAtEdge = false;
		        if (y > 0) y = 0;
		        if(mTempSprite.getFacingRight()) {
		          x ++;
		        }
		        else {
		          x --;
		        }
		      }
		      if ( mGuySprite.getMapPosY() > mTempSprite.getMapPosY()) { // below platforms
		        canFall = true;
                  //mCanFallAtEdge = true;
		        y =  mMovementV.getVMove();
		      }
		    }

		  }

		  return temp;
		  
	}

	function scrollBg() {

		    advanceMesh();

		/* scroll registers for background */
        var mRejectUp = false;

		canScroll = true;
		oldX = mMovementV.getScrollX();
		oldY = mMovementV.getScrollY();
		screenX = oldX;
		screenY = oldY;
		mapH = mGameV.getMapH();
		mapV = mGameV.getMapV();

		mapX = mGuySprite.getMapPosX();
		mapY = mGuySprite.getMapPosY();

		newMapX = mapX;
		newMapY = mapY;

		//newX = mGuySprite.getX();
		//newY = mGuySprite.getY();

		guyWidth = (mGuySprite.getRightBB() - mGuySprite.getLeftBB()) + 5; // 12 ?
		guyHeight = mGuySprite.getBottomBB() - mGuySprite.getTopBB();

		var tilesMeasurement;

		if (mGameV.isDoubleScreen()) {
			tilesMeasurement = ((    mDisplayViewWidth / 2 ) / 8) ;
			if (tilesMeasurement > 32 ) tilesMeasurement = 32;
			    mScreenW = tilesMeasurement * 8;
			//if (tilesMeasurement * 16 <     mDisplayWidth) tilesMeasurement ++;

		}
		else {
			    mScreenW =     mDisplayViewWidth;
			tilesMeasurement = 32;
			//tilesMeasurement =     mDisplayViewWidth /8 ;// TODO: test me!!
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
                if(mCanFallAtEdge) y = mMovementV.getVMove();
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
		
		mGuySprite.setMapPosX(newMapX);
		mGuySprite.setMapPosY(newMapY);
		
		mMovementV.setScrollX(screenX);
		mMovementV.setScrollY(screenY);
	}
	function checkRegularCollisions() {

		/*
		 * Here we create a BoundingBox for the guy character. Then
		 * we check the level for collisions. The object is to record when the 
		 * character comes varo contact with various objects.
		 */

		//BoundingBox guyBoxNext = makeSpriteBox(guy, x, y);
		BoundingBox guyBox = BoundingBox.makeSpriteBox(mGuySprite, x, y );

		// set ladderTest to false
		ladderTest = false;
		blockTest = false;
		boundaryTest = false;
		boundaryLeft = false;
		boundaryRight = false;
		canFall = true;

		if(mObjects.getSeedsLeft() <= 0 && mGameV.getBossLevel()) {
			//win game
			if (mObjects.endBossLevel()) {
				mGameV.setEndLevel(true);
				    incrementJniScore(1000);
				mGameV.incrementScore(1000);
				mSounds.playSound(SoundPoolManager.SOUND_GOAL);
			}
		}
		
		var i,j;

		for (j =  mGuySprite.getMapPosX() / 8 -1; j <  mGuySprite.getMapPosX() / 8 + 3; j ++ ) { // x coordinates
			for (i = mGuySprite.getMapPosY() / 8 - 1; i < mGuySprite.getMapPosY() / 8 + 3; i ++ ) { // y coordinates
				if(j >= 0 && j < mGameV.getMapH()  && i >= 0 && i < mGameV.getMapV()) {// indexes OK?

					if (mGameV.getObjectsCell(j,i)  != 0 ) { // I/J or J/I... which one???

						/* save time here by checking the bounding 
						 * box only in the squares immediately surrounding
						 * the character...
						 * Instead of checking the whole field of play.
						 */

						BoundingBox testMe = BoundingBox.makeBlockBox(j,i);
						//bool testNext = collisionSimple(guyBoxNext, testMe);
						var test = BoundingBox.collisionSimple(guyBox, testMe);

						/****** tests here ******/

						/*********  block ***************/
						if (test && mGameV.getObjectsCell(j, i) == mGameV.mBlock) {
							blockTest = true;

						}
						/******** ladder **********/
						if (test && mGameV.getObjectsCell(j, i) == mGameV.mLadder) {
							ladderTest = true;
							//canFall = false;
						}

						/************ GOAL ****************/
						if (test && (getObjectsDisplay(j,i) == mGameV.mGoal ) ) {

							mGameV.setEndLevel(true);

							
							mGameV.setObjectsCell(j, i, 0);
							
							
							setObjectsDisplay(j, i, 0);//jni
							    incrementJniScore(100);
							

							mGameV.incrementScore(100);
							//mmEffect(SFX_GOAL);
							mSounds.playSound(SoundPoolManager.SOUND_GOAL);

						}
						/************ goal ends ****************/
						/************* prizes ******************/
						if (test && mGameV.getObjectsCell(j,i) == mGameV.mPrize ) {

							
							mGameV.setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							    incrementJniScore(10);
							

							mGameV.incrementScore(10);
							//mmEffect(SFX_PRIZE);
							mSounds.playSound(SoundPoolManager.SOUND_PRIZE);
						}

						/********** prizes end *****************/
						/************* keys   ******************/
						if (test && mGameV.getObjectsCell(j,i) == mGameV.mKey ) {

							
							mGameV.setObjectsCell(j, i, 0);
							
							//setObjectsDisplay(j, i, 0);//jni
							    incrementJniScore(50);
							
							mGameV.incrementScore(50);

							mSounds.playSound(SoundPoolManager.SOUND_PRIZE);
							//data[level.usernum].level = level.room;
							//must save this data...
						}

						/**********   keys end *****************/
						/**************** oneup ****************/
						if (test && mGameV.getObjectsCell(j,i) == mGameV.mOneup ) {

							
							mGameV.setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							

							mSounds.playSound(SoundPoolManager.SOUND_GOAL);
							mGameV.incrementLives();
						}
						/*****************end oneup *************/
						/**************** bigprize ****************/
						if (test && mGameV.getObjectsCell(j,i) == mGameV.mBigprize ) {

							
							mGameV.setObjectsCell(j, i, 0);
							
							setObjectsDisplay(j, i, 0);//jni
							    incrementJniScore(200);
							

							mGameV.incrementScore(200);
							//mmEffect(SFX_PRIZE);
							mSounds.playSound(SoundPoolManager.SOUND_PRIZE);

						}
						/*****************end bigprize *************/
						/************ death ****************/
						if (test && mGameV.getObjectsCell(j,i) == mGameV.mDeath && mGameV.isGameDeath() == false) {

							mGameV.setGameDeath(true);
							mGameV.setEndLevel(true);
							mGameV.decrementLives();

							//mmEffect(SFX_OW);
							mSounds.playSound(SoundPoolManager.SOUND_OW);
						}
						/************ death ends ****************/
						/****** end tests  ******/

						//mHighScores.setAll(mGameV, mGameV.getUsernum());
						//mHighScores.setAll(mGameV.getGuyScore());

					}//if block
				} // indexes OK?
				else {

					boundaryTest = true;
					if(j >= mGameV.getMapH() -1) boundaryRight = true;
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


	  function readKeys( num) {
		mXMultiplier = num;
		mYMultiplier = num;
		readKeys();
		mXMultiplier = 1;
		mYMultiplier = 1;
	}


	 function readKeys() {		

		/* set x and y as determined by game pad input */
		x=0;
		y=0;

        //if(mCapturedPhysics) return;

        //keyB = false;

		//changeX = false;
		//changeY = false;

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
		

	}
	
	function povarToBlockNum( x,  y) {
		var mNewX, mNewY;
		mNewX = x / 8;
		mNewY = y / 8;
		return mGameV.getObjectsCell(mNewX, mNewY);
	}
	
	/*
	@Override
	function onDrawFrame(GL10 gl) {
		//TODO Auto-generated method stub
		
		    JNIdraw();
		//Log.e("tag","score " +     JNItestScore());
	}


	@Override
	function onSurfaceChanged(GL10 gl, var width, var height) {
		//TODO Auto-generated method stub
		    JNIresize(width, height);

	}


	@Override
	function onSurfaceCreated(GL10 gl, EGLConfig config) {
		//TODO Auto-generated method stub
		    JNIinit();

		//    JNIresize(mDimensionWidth,mDimensionHeight); // wrong dimensions
		
//		if (!mGameV.isUseSavedBundle()) {
//			mGameV.getHandler().sendEmptyMessage(GameStart.STARTLEVEL);
//
//	    }
//	    else {
//	    	mGameV.getHandler().sendEmptyMessage(GameStart.REORIENTATION);
//	    }
		mGameV.getHandler().sendEmptyMessage(GameStart.STARTLEVEL);

		
	}
    */

	function makeDetectionPattern( type,  cheat){
		DetectionPattern mTemp = new DetectionPattern();
		mTemp.setType(type);
		SpriteInfo mSprite = mGameV.getSprite(0);
		
		var mTestCenterX = mSprite.getMapPosX() + (mSprite.getLeftBB() + mSprite.getRightBB()) / 2;
		var mTestBelowY = mSprite.getMapPosY() + mSprite.getBottomBB() + cheat;
		var mTestAboveY = mSprite.getMapPosY() + mSprite.getTopBB() - cheat;
		
		var mTestLowerY = mSprite.getMapPosY() + mSprite.getBottomBB() - cheat;
		var mTestUpperY = mSprite.getMapPosY() + mSprite.getTopBB() + cheat;
		var mTestRightX = mSprite.getMapPosX() + mSprite.getRightBB() + cheat;
		var mTestLeftX = mSprite.getMapPosX() + mSprite.getLeftBB() - cheat;


		if (povarToBlockNum(mTestCenterX, mTestAboveY) == type) mTemp.setTop(true);
		
		if (povarToBlockNum(mTestCenterX - 2, mTestBelowY) == type
			|| povarToBlockNum(mTestCenterX + 2, mTestBelowY) == type) {
			mTemp.setBottom(true);

            var mTestBlockY =  ((mTestBelowY/8 + 1)*8) - (newMapY + mSprite.getHeight()) ;

            if(type == mGameV.mBlock && mTestBlockY  <= 8*4 && mTestBlockY >= 8*3 ) {
                mCloseBottomGap = true;
            }

        }
		
		if (povarToBlockNum(mTestLeftX, mTestUpperY) == type) mTemp.setUpperLeft(true);
		if (povarToBlockNum(mTestLeftX, mTestLowerY) == type) mTemp.setLowerLeft(true);
		
		if (povarToBlockNum(mTestRightX, mTestUpperY) == type) mTemp.setUpperRight(true);
		if (povarToBlockNum(mTestRightX, mTestLowerY) == type) mTemp.setLowerRight(true);
		
		if (type == mGameV.mBlock) {
			
			if (mSprite.getMapPosX() + mSprite.getRightBB() + cheat > mGameV.getMapH() * 8) {
				mTemp.setUpperRight(true);
				mTemp.setLowerRight(true);
            }
			if (mSprite.getMapPosX() + mSprite.getLeftBB() - cheat < 0) {
				mTemp.setLowerLeft(true);
				mTemp.setUpperLeft(true);
			}
			if (mSprite.getMapPosY() + mSprite.getBottomBB() + cheat > mGameV.getMapV() * 8  ) {
				mTemp.setBottom(true);
				//mMovementV.setmVMoveShave();
                //Log.e("Platforms",   " mclose =" + mCloseBottomGap	);

                //mCloseBottomGap = true;
			}

            if (mSprite.getMapPosY() + mSprite.getBottomBB() + mMovementV.getVMove() > mGameV.getMapV() * 8 ) {
                mTemp.setBottom(true);
                //mMovementV.setmVMoveShave();
            }
			if (mSprite.getMapPosY() + mSprite.getTopBB() - cheat < 0 ) {
				mTemp.setTop(true);
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
			SpriteInfo temp = mGameV.getSprite(i);
			addMonster(temp.getMapPosX(), temp.getMapPosY(), temp.getAnimIndex());

		}
	}
	
	function addPlatformsJNI() {
		if (mGameV.getPlatformNum() == -1) return;
		for (var i = mGameV.getPlatformOffset() ; i <=  mGameV.getPlatformNum(); i++) {
			SpriteInfo temp = mGameV.getSprite(i);
			addPlatform(temp.getMapPosX(), temp.getMapPosY());

		}
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
	
	
	
