package com.voronoi.directel;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;

public class MainActivity extends Activity {
	private long ms=0,splashDuration=3000;
	private boolean splashActive=true;
	private boolean paused=false;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	Thread splash=new Thread(){
		
		public void run(){
		
			try{
			
				while(splashActive && ms<splashDuration){
					if(!paused)
						ms=ms+100;
						sleep(100);
				}
				
			}catch(Exception e){
				
			}finally{
				Intent intent=new Intent(MainActivity.this,DirecTEL.class);
				startActivity(intent);
			}
			
		}
		
	};
	splash.start();
	
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

}
