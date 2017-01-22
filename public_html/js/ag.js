/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class AG {};
    
AG.UP = 38;
AG.DOWN = 40;
AG.LEFT = 37;
AG.RIGHT = 39;
AG.JUMP = 90;

AG.B_START = 5;
AG.B_SPACE = 0;
AG.B_LADDER = 444;
AG.B_BLOCK = 442;
AG.B_GOAL = 446;
AG.B_KEY = 445; 
AG.B_PRIZE =  447;
AG.B_MONSTER = 443;
AG.B_MARKER = 441; 
AG.B_DEATH = 439 ;
AG.B_ONEUP = 438 ;
AG.B_BIBPRIZE = 440 ;
AG.B_PLATFORM = 437 ;
AG.B_INITIAL_GOAL = 500;
 
AG.TILEMAP_WIDTH = 224;
AG.TILEMAP_HEIGHT = 128;
 
AG.TILE_WIDTH = 8;
AG.TILE_HEIGHT = 8;
 
AG.GUY_WIDTH = 16;
AG.GUY_HEIGHT = 16;
AG.GUY_CHEAT = 3;
 
AG.MONSTER_WIDTH = 16;
AG.MONSTER_HEIGHT = 16;
 
AG.PLATFORM_WIDTH = 40;
AG.PLATFORM_HEIGHT = 8;
 
AG.MAP_WIDTH = 96;
AG.MAP_HEIGHT = 96;
 
AG.SCREEN_WIDTH = 256;
AG.SCREEN_HEIGHT = 192;
    
AG.MONSTER_TOTAL = 50;
AG.PLATFORM_TOTAL = 20;

AG.SCREEN_TILES_H = 32;
AG.SCREEN_TILES_V = 24;

AG.NUM_LEVELS = 10;

AG.FRAMES_PER_SECOND = 3;
	



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
        var mPlayAgain = true;
	
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
	
	var mSounds;
	var mEnableSounds;
	var mAnimationOnly;
	var mSDKVersion;
        var nextGameTick;
        
	var is_game_running = true;
        var is_end_game = false;
	var is_finished_loading ;
        
        var is_end_level = false;
        var is_game_death = false;
        
        var DetectionPattern = {
		top : false,
		bottom : false,
		center : false,
		upperLeft : false,
		lowerLeft : false,
		upperRight : false,
		lowerRight : false,
		type : 0
	}
        